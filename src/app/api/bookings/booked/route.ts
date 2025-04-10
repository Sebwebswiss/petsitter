export const dynamic = "force-dynamic"; // Prevent Next.js caching

import { NextResponse } from "next/server";
import Booking from "@/models/Booking";
import connectDB from "@/config/dbConnect";

// Generate time slots
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 30]) {
      slots.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
  }
  return slots;
}

const timeSlots = generateTimeSlots();

function isSameDate(d1: Date, d2: Date) {
  return d1.toISOString().split("T")[0] === d2.toISOString().split("T")[0];
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    // Fetch bookings from MongoDB, excluding the one with bookingId if provided
    const query = bookingId ? { _id: { $ne: bookingId } } : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();

    const disabledTimeSlotsMap: Record<string, Set<string>> = {};

    bookings.forEach((booking: any) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);

      let current = new Date(bookingStart);
      current.setUTCHours(0, 0, 0, 0);
      const endDay = new Date(bookingEnd);
      endDay.setUTCHours(0, 0, 0, 0);

      while (current <= endDay) {
        const dateStr = current.toISOString().split("T")[0];
        if (!disabledTimeSlotsMap[dateStr]) {
          disabledTimeSlotsMap[dateStr] = new Set();
        }

        let rangeStartTime = "00:00";
        let rangeEndTime = "23:30";

        if (isSameDate(current, bookingStart) && isSameDate(current, bookingEnd)) {
          rangeStartTime = booking.startTime;
          rangeEndTime = booking.endTime;
        } else if (isSameDate(current, bookingStart)) {
          rangeStartTime = booking.startTime;
        } else if (isSameDate(current, bookingEnd)) {
          rangeEndTime = booking.endTime;
        }

        timeSlots.forEach((slot) => {
          if (slot >= rangeStartTime && slot <= rangeEndTime) {
            disabledTimeSlotsMap[dateStr].add(slot);
          }
        });

        current.setDate(current.getDate() + 1);
      }
    });

    const fullDaySlotCount = timeSlots.length;
    const disabledDates: string[] = [];
    const disabledTimeSlots: Record<string, string[]> = {};

    Object.keys(disabledTimeSlotsMap).forEach((dateStr) => {
      const slots = Array.from(disabledTimeSlotsMap[dateStr]).sort();
      disabledTimeSlots[dateStr] = slots;
      if (slots.length === fullDaySlotCount) {
        disabledDates.push(dateStr);
      }
    });

    return NextResponse.json(
      { data: { disabledDates, disabledTimeSlots } },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } }
    );
  } catch (error) {
    console.error("Error fetching disabled slots:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
