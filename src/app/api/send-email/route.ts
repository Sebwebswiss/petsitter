import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { service, date, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
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

    // 1. Email vlasniku web stranice
    const mailToOwner = {
      from: `"Website" <${process.env.GMAIL_USER}>`,
      to: process.env.BUSINESS_OWNER_EMAIL,
      subject: `New Consultation Request from ${email}`,
      text: `Service: ${service}\nDate: ${date}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailToOwner);

    // 2. Email korisniku (potvrda)
    const mailToUser = {
      from: `"PetCare Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for your request",
      text: `Hi there,\n\nThank you for reaching out to us regarding ${service} on ${date}.\n\nWe’ve received your message and will get back to you as soon as possible.\n\nYour message:\n"${message}"\n\nBest regards,\nPetCare Team`,
    };

    await transporter.sendMail(mailToUser);

    return NextResponse.json(
      { success: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
