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

function getDateRangeArray(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);
  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function getDateTime(date: string, time: string): Date {
  const [hourMinute, modifier] = time.split(" ");
  let [hours, minutes] = hourMinute.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return new Date(`${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);
}

const createBookingHandler = async (request: NextRequest) => {
  try {
    await connectDB();

    const req = await request.json();
    const user = request.user;

    const newStartDates = getDateRangeArray(req.startDate, req.endDate);
    const newStartDateTime = getDateTime(req.startDate, req.startTime);
    const newEndDateTime = getDateTime(req.endDate, req.endTime);

    const bookings = await Booking.find({
      startDate: { $lte: req.endDate },
      endDate: { $gte: req.startDate },
    });

    const hasConflict = bookings.some((booking) => {
      const existingDates = getDateRangeArray(booking.startDate, booking.endDate);
      return newStartDates.some((date) => {
        if (!existingDates.includes(date)) return false;
        const bookingStart = getDateTime(date, booking.startTime);
        const bookingEnd = getDateTime(date, booking.endTime);
        return newStartDateTime < bookingEnd && newEndDateTime > bookingStart;
      });
    });

    if (hasConflict) {
      return NextResponse.json({
        success: false,
        status: 409,
        error: "This time slot is already booked.",
      }, { status: 409 });
    }

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

    const htmlToOwner = `
      <h2>New Booking Request Received</h2>
      <p><strong>Service Type:</strong> ${req.servicetype}</p>
      <p><strong>Start:</strong> ${req.startDate} at ${req.startTime}</p>
      <p><strong>End:</strong> ${req.endDate} at ${req.endTime}</p>
      <p><strong>Frequency:</strong> ${req.frequency}</p>
      <p><strong>User:</strong> ${user.firstName} (${user.email})</p>
      <p><strong>Phone:</strong> ${req.phone}</p>
    `;

    const mailToOwner = {
      from: `"Booking Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_OWNER_EMAIL,
      subject: "New Booking Request Received",
      html: htmlToOwner,
    };

    const htmlToUser = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thank you for your booking, ${user.firstName}!</h2>
        <p>We have received your request and are excited to care for your pet.</p>
        <hr />
        <h3>Your Booking Details</h3>
        <p><strong>Service:</strong> ${req.servicetype}</p>
        <p><strong>Start:</strong> ${req.startDate} at ${req.startTime}</p>
        <p><strong>End:</strong> ${req.endDate} at ${req.endTime}</p>
        <p><strong>Frequency:</strong> ${req.frequency}</p>
        <br />
        <p>🐾 <strong>PetCare Team</strong></p>
        <p style="font-size: 12px; color: #999;">This is an automated confirmation email from PetCare.</p>
      </div>
    `;

    const mailToUser = {
      from: `"PetCare Team" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Booking Confirmation",
      html: htmlToUser,
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
    console.error("Booking Error:", error);
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
