import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { startDate, endDate, startTime, endTime, email, servicetype, frequency } = await req.json();

    if (!email || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required booking details" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email vlasniku
    const mailToOwner = {
      from: `"PetCare Website" <${process.env.GMAIL_USER}>`,
      to: process.env.BUSINESS_OWNER_EMAIL,
      subject: "New Booking Request",
      text: `Service: ${servicetype}\nFrequency: ${frequency}\nStart: ${startDate} ${startTime}\nEnd: ${endDate} ${endTime}\nUser: ${email}`,
    };

    await transporter.sendMail(mailToOwner);

    // Email korisniku
    const mailToUser = {
      from: `"PetCare Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Booking Request Received",
      text: `Hi,\n\nThank you for booking a service with us!\n\nHere are your booking details:\n\nService: ${servicetype}\nFrequency: ${frequency}\nStart: ${startDate} ${startTime}\nEnd: ${endDate} ${endTime}\n\nWe will contact you soon to confirm everything.\n\nBest regards,\nPetCare Team`,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);

    return NextResponse.json({ success: "Booking emails sent." }, { status: 200 });

  } catch (error) {
    console.error("Booking Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send booking emails" },
      { status: 500 }
    );
  }
}
