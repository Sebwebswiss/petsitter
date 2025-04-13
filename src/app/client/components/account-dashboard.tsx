import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetPetsStatsQuery } from "@/features/petsApi";
import SelectDate from "./selectDate";
import {
  useCreateBookingMutation,
  useGetBookingsQuery,
} from "@/features/bookingApi";
import SelectTime from "./selectTime";
import toast from "react-hot-toast";

const services = [
  {
    id: "pet-sitting",
    title: "Pet Sitting",
    description: "Professional pet care while you're away.",
  },
  {
    id: "dog-walking",
    title: "Dog Walking",
    description: "Daily walks for your furry friend.",
  },
  {
    id: "drop-in-visit",
    title: "Drop In Visit",
    description: "Quick visit for feeding, playtime, and care updates.",
  },
];

const AccountDashboard = () => {
  const [createBooking] = useCreateBookingMutation();
  const { data, isFetching, error } = useGetPetsStatsQuery("");
  const { refetch } = useGetBookingsQuery({ page: 1, limit: 10 });
  const pets = data?.data;

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [serviceType, setServiceType] = useState("Pet Sitting");
  const [frequency, setFrequency] = useState("One-Time");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    startTime: "",
    endTime: "",
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "Date";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRequestBooking = () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      toast.error("Please select a valid start and end date");
      return;
    }
    if (!selectedTimeRange.startTime || !selectedTimeRange.endTime) {
      toast.error("Please select a valid start and end time");
      return;
    }
    const newDateTimeString = `${formatDate(selectedDate)} ${selectedTime}`;
    const newDateTimeObj = new Date(newDateTimeString);
    if (newDateTimeObj <= new Date()) {
      toast.error("Booking time must be in the future");
      return;
    }
    if (
      selectedRange.startDate === selectedRange.endDate &&
      selectedTimeRange.startTime === selectedTimeRange.endTime
    ) {
      toast.error("Start and End Time Must Not Be Same");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmBookingRequest = async () => {
    try {
      await createBooking({
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
        startTime: selectedTimeRange.startTime,
        endTime: selectedTimeRange.endTime,
        servicetype: serviceType,
        frequency,
      }).unwrap();

      setSelectedRange({
        startDate: "",
        endDate: "",
      });
      setSelectedTimeRange({
        startTime: "00:00",
        endTime: "00:00",
      });
      setServiceType("Pet Sitting");
      setFrequency("One-Time");

      toast.success("Booking request submitted successfully!");
      await refetch();
    } catch (error) {
      toast.error("Error processing booking");
    }

    setPhoneNumber("");
  setShowConfirmModal(false);
    setIsModalOpen(false);
  };

  if (!isFetching) {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 xl:px-7.5 gap-4 md:gap-0">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <button
            className="w-full md:w-auto flex justify-center rounded bg-golden px-6 py-2 font-semibold text-gray hover:bg-opacity-90"
            type="button"
            onClick={() => {
              setServiceType("Pet Sitting");
              setFrequency("One-Time");
              setSelectedDate(new Date());
              setSelectedTime(null);
              setIsModalOpen(true);
            }}
          >
            Request a Booking
          </button>
        </div>
        
{showConfirmModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold mb-4">Confirm Booking Request</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please enter your phone number to confirm the booking.
      </p>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          onClick={() => {
            setShowConfirmModal(false);
            setPhoneNumber("");
          }}
        >
          Cancel
        </button>
        <button
          className={`py-2 px-4 rounded transition text-white ${
            phoneNumber
              ? "bg-golden hover:bg-yellow-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={confirmBookingRequest}
          disabled={!phoneNumber}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

          </div>
        )}
        {isModalOpen ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Request a Booking</h3>
            <label className="block text-sm font-medium text-gray-700">
              Service Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setServiceType(service.title)}
                  className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${
                    serviceType === service.title
                      ? "border-primary bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className="w-6 flex-shrink-0 flex justify-center items-center">
                    {serviceType === service.title ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="5" fill="white" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="5" fill="white" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:space-x-10 flex flex-col md:flex-row justify-center mx-auto py-4 md:py-8 font-sans">
              <div className="flex flex-col items-center">
                <span className="uppercase text-center font-extrabold text-2xl text-golden">
                  Select Dates
                </span>
                <SelectDate
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                />
              </div>
              <div className="md:w-[40%] flex flex-col items-center">
                <span className="uppercase text-center font-extrabold text-2xl text-golden">
                  Select Timings
                </span>
                <SelectTime
                  selectedTimeRange={selectedTimeRange}
                  setSelectedTimeRange={setSelectedTimeRange}
                  selectedDate={selectedRange}
                />
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              className="w-full mt-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="One-Time">One-Time</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Every Other Day">Every Other Day</option>
            </select>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-golden text-white py-2 px-4 rounded transition"
                onClick={handleRequestBooking}
              >
                Request Booking
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex bg-white flex-col md:flex-row rounded-lg shadow-md justify-between items-center">
                <div className="flex flex-col items-center flex-1 p-3">
                  <p className="text-xl text-center">You have created</p>
                  <p className="font-bold text-8xl text-center text-golden">
                    {pets?.dogs}
                  </p>
                  <p className="text-xl text-center ">Dogs Profiles</p>
                  <Link href="/client/dashboard/pets">
                    <button className="mt-4 bg-golden text-black text-sm rounded px-10 py-2 font-semibold hover:bg-[#001D3D]">
                      See all Dogs
                    </button>
                  </Link>
                </div>
                <Image
                  src="/images/young-brown.png"
                  alt="dogs-count"
                  height={120}
                  width={200}
                  className="md:rounded-br-[10px] hidden md:block"
                />
              </div>
              <div className="flex bg-white rounded-lg shadow-md justify-between items-center">
                <div className="flex flex-col items-center flex-1 p-3">
                  <p className="text-xl text-center">You have created</p>
                  <p className="font-bold text-8xl text-center text-golden">
                    {pets?.cats}
                  </p>
                  <p className="text-xl text-center ">Cats Profiles</p>
                  <Link href="/client/dashboard/pets">
                    <button className="mt-4 bg-golden text-black text-sm rounded px-10 py-2 font-semibold hover:bg-[#001D3D]">
                      See all Cats
                    </button>
                  </Link>
                </div>
                <Image
                  src="/images/cats.png"
                  alt="cats-count"
                  height={100}
                  width={210}
                  className="hidden md:block"
                />
              </div>
            </div>
            <Link href="/client/dashboard/pets">
              <button className="bg-golden text-black w-full text-sm rounded px-8 py-2 font-semibold hover:bg-[#001D3D]">
                See all Pets
              </button>
            </Link>
          </>
        )}
      </div>
    );
  } else if (isFetching) {
    return (
      <div className="flex w-[30%] mx-[35%] py-10">
        <div className="flex mx-auto h-[15rem] items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>
    );
  }
};

export default AccountDashboard;
