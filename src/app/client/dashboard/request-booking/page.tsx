"use client";
import { useState } from "react";
import SelectDate from "@/components/selectDate";
import SelectTime from "@/components/selectTime";
import toast from "react-hot-toast";
import { useCreateBookingMutation, useGetBookedBookingsQuery } from "@/features/bookingApi";

const services = [
  { id: "pet-sitting", title: "Pet Sitting", description: "Professional pet care while you're away." },
  { id: "dog-walking", title: "Dog Walking", description: "Daily walks for your furry friend." },
  { id: "drop-in-visit", title: "Drop In Visit", description: "Quick visit for feeding, playtime, and care updates." },
];

const BookingPage = () => {
  const [serviceType, setServiceType] = useState("Pet Sitting");
  const [frequency, setFrequency] = useState("One-Time");
  const [selectedRange, setSelectedRange] = useState({ startDate: "", endDate: "" });
  const [selectedTimeRange, setSelectedTimeRange] = useState({ startTime: "", endTime: "" });

  const { data: bookedData } = useGetBookedBookingsQuery(""); // možeš kasnije podesiti ako treba ID
  const [createBooking] = useCreateBookingMutation();

  const handleSubmit = async () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      toast.error("Please select start and end date.");
      return;
    }

    if (!selectedTimeRange.startTime || !selectedTimeRange.endTime) {
      toast.error("Please select start and end time.");
      return;
    }

    try {
      await createBooking({
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        startTime: selectedTimeRange.startTime,
        endTime: selectedTimeRange.endTime,
        servicetype: serviceType,
        frequency,
      }).unwrap();

      toast.success("Booking request sent!");
      setSelectedRange({ startDate: "", endDate: "" });
      setSelectedTimeRange({ startTime: "", endTime: "" });
      setServiceType("Pet Sitting");
      setFrequency("One-Time");
    } catch (err) {
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Request a Booking</h1>

      <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setServiceType(service.title)}
            className={`p-4 border rounded-md cursor-pointer ${serviceType === service.title ? "border-primary bg-gray-100" : "border-gray-300"}`}
          >
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:space-x-10 mb-4">
        <div className="flex-1">
          <h2 className="font-bold text-golden mb-2">Select Dates</h2>
          <SelectDate
            selectedRange={selectedRange}
            bookedData={bookedData}
            setSelectedRange={setSelectedRange}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-golden mb-2">Select Timings</h2>
          <SelectTime
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            selectedDate={selectedRange}
            bookedData={bookedData}
          />
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-6 w-full"
      >
        <option value="One-Time">One-Time</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Every Other Day">Every Other Day</option>
      </select>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-golden text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Submit Booking
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
