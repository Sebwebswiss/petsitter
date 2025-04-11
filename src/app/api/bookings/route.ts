import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/dbConnect";
import Booking from "@/models/Booking";
import { authMiddleware } from "@/middleware/authMiddleware";
import nodemailer from "nodemailer";

const getBookingsHandler = async (request: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const user = request.user;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const bookings = await Booking.find({ user: user._id })
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await Booking.countDocuments({ user: user._id });

    return NextResponse.json({
      success: true,
      status: 200,
      data: bookings,
      pagination: {
        total: totalBookings,
        page,
        pages: Math.ceil(totalBookings / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const createBookingHandler = async (request: NextRequest) => {
  try {
    await connectDB();

    const req = await request.json();
    const user = request.user;

    const newBooking = await Booking.create({ ...req, user: user._id });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email vlasniku
    const mailToOwner = {
      from: `"Booking Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_OWNER_EMAIL,
      subject: "New Booking Request Received",
      text: `A new booking request has been received.

Service Type: ${req.servicetype}
Booking Request Start Date: ${req.startDate}
Booking Request End Date: ${req.endDate}
Booking Request Start Time: ${req.startTime}
Booking Request End Time: ${req.endTime}
Frequency: ${req.frequency}
User Name: ${user.firstName}
User Email: ${user.email}
`,
    };

    // Email korisniku
    const mailToUser = {
      from: `"PetCare Team" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Booking Confirmation",
      text: `Hi ${user.firstName},

Thank you for booking with PetCare! Here are your booking details:

Service: ${req.servicetype}
Start Date: ${req.startDate}
End Date: ${req.endDate}
Start Time: ${req.startTime}
End Time: ${req.endTime}
Frequency: ${req.frequency}

We look forward to caring for your pet 🐾

Best regards,  
PetCare Team
`,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToUser);

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Booking Created",
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const GET = authMiddleware(getBookingsHandler);
export const POST = authMiddleware(createBookingHandler);
