"use client";
import { Key, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SelectDate from "./selectDate";
import SelectTime from "./selectTime";
import toast, { Toaster } from "react-hot-toast";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetBookedBookingsQuery,
} from "@/features/bookingApi";
import Loader from "@/components/loader";
import { format } from "date-fns";


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

const AppointmentsTable = ({ dashboard }: { dashboard: boolean }) => {
  // Local state for appointments and modal modes
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [serviceType, setServiceType] = useState("Pet Sitting");
  const [frequency, setFrequency] = useState("One-Time");
  const [showScheduling, setShowScheduling] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState<any>(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    startTime: "",
    endTime: "",
  });

  const [page, setPage] = useState(1);
  const limit = dashboard ? 5 : 10;

  const { data, isLoading, isFetching, error } = useGetBookingsQuery({ page, limit });
  const { data: bookedData } = useGetBookedBookingsQuery(
    editingAppointment?._id || ""
  );
  console.log("🚀 ~ AppointmentsTable ~ bookedData:", bookedData)

  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();


  const formatDate = (date: Date | null) => {
    if (!date) return "Date";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Called when user clicks "Request Booking" or "Update Booking"
  const handleRequestBooking = () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      toast.error("Please select a valid start and end date");
      return;
    }
    if (!selectedTimeRange.startTime || !selectedTimeRange.endTime) {
      toast.error("Please select a valid start and end time");
      return;
    }
    // Validate that the selected date/time is in the future
    const newDateTimeString = `${formatDate(selectedDate)} ${selectedTime}`;
    const newDateTimeObj = new Date(newDateTimeString);
    if (newDateTimeObj <= new Date()) {
      toast.error("Booking time must be in the future");
      return;
    }
    if (selectedRange.startDate === selectedRange.endDate) {
      if (selectedTimeRange.startTime === selectedTimeRange.endTime) {
        toast.error("Start and End Time Must Not Be Same")
        return;
      }
    }

    setShowConfirmModal(true);
  };

  const confirmBookingRequest = async () => {


    try {
      if (editingAppointment) {
        await updateBooking({
          id: editingAppointment._id,
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
          startTime: "",
          endTime: "",
        });
        setServiceType("Pet Sitting");
        setFrequency("One-Time");
        toast.success("Booking updated successfully!");
      } else {
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
      }
    } catch (error) {
      toast.error("Error processing booking");
    }
    setShowConfirmModal(false);
    setIsModalOpen(false);
    setShowScheduling(true);
    setEditingAppointment(null);
  };

  const confirmDeleteBooking = async () => {
    if (appointmentToDelete) {
      try {
        await deleteBooking({ id: appointmentToDelete._id }).unwrap();
        toast.success("Booking deleted successfully!");
      } catch (error) {
        toast.error("Error deleting booking");
      }
      setShowDeleteConfirmModal(false);
      setAppointmentToDelete(null);
    }
  };

  if (isLoading || isDeleting || isFetching) {
    return <Loader />;
  }


  return (
    <div className="">
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {editingAppointment ? "Confirm Update" : "Confirm Booking Request"}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {editingAppointment
                ? "This will update your booking details. Please confirm to proceed."
                : "This is a booking request, not a confirmed booking. We will contact you to confirm the booking and arrange payment details. Please confirm to proceed."}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-golden text-white py-2 px-4 rounded transition"
                onClick={confirmBookingRequest}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this booking?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded transition"
                onClick={confirmDeleteBooking}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            {editingAppointment ? "Edit Booking" : "Request a Booking"}
          </h3>
          <label className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setServiceType(service.title)}
                className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${serviceType === service.title
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
                  <p className="text-sm text-gray-600">{service.description}</p>
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
                bookedData={bookedData}
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
                bookedData={bookedData}
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
                setEditingAppointment(null);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-golden text-white py-2 px-4 rounded transition"
              onClick={handleRequestBooking}
            >
              {editingAppointment ? "Update Booking" : "Request Booking"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="md:hidden flex items-center justify-end mb-4">

            {!dashboard && (
              <button
                className="flex justify-center rounded bg-golden px-6 py-2 font-semibold text-gray hover:bg-opacity-90"
                onClick={() => {
                  setEditingAppointment(null);
                  setServiceType("Pet Sitting");
                  setFrequency("One-Time");
                  setSelectedDate(new Date());
                  setSelectedTime(null);
                  setIsModalOpen(true);
                }}
              >
                Request a Booking
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <div className="rounded-sm border border-stroke bg-white shadow-default min-w-max ">
              <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-2xl font-semibold text-black">
                  Your Bookings
                </h4>
                {!dashboard && (
                  <button
                    className="hidden md:flex justify-center rounded bg-golden px-6 py-2 font-semibold text-gray hover:bg-opacity-90"
                    onClick={() => {
                      setEditingAppointment(null);
                      setServiceType("Pet Sitting");
                      setFrequency("One-Time");
                      setSelectedDate(new Date());
                      setSelectedTime(null);
                      setIsModalOpen(true);
                    }}
                  >
                    Request a Booking
                  </button>
                )}
              </div>
              {/* <div>
            <div className="grid grid-cols-12 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7.5 text-black">
              <div className="col-span-4 flex items-center min-w-[200px]">
                <p className="font-bold">Service Name</p>
              </div>
              <div className="col-span-4 flex items-center min-w-[150px]">
                <p className="font-medium">Timings</p>
              </div>
              <div className="col-span-2 flex items-center min-w-[150px]">
                <p className="font-medium">Frequency</p>
              </div>
              <div className="col-span-2 flex items-center justify-center min-w-[100px]">
                <p className="font-medium">Actions</p>
              </div>
            </div>
            {data?.data?.map((appointment:any, key: Key) => (
              <div
                className="grid grid-cols-12 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7"
                key={key}
              >
                <div className="col-span-4">
                  <p className="text-md font-bold">
                    {appointment.servicetype}
                  </p>
                </div>
                <div className="col-span-4 flex items-center">
                  <p className="text-sm">{format(appointment.startDate, "yyyy-MM-dd")} {(appointment.startTime)} - {format(appointment.endDate, "yyyy-MM-dd")} {(appointment?.endTime)}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-meta-3">{appointment.frequency}</p>
                </div>
                <div className="col-span-2 flex justify-center items-center space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      // Set edit mode with appointment data
                      setEditingAppointment(appointment);
                      setServiceType(appointment.servicetype);
                      setFrequency(appointment.frequency);
                      setSelectedRange({
                        startDate: appointment.startDate,
                        endDate: appointment.endDate
                      })
                    
                      setSelectedTimeRange({
                        startTime: appointment.startTime,
                        endTime: appointment.endTime
                      })
                    
                      setIsModalOpen(true);
                    }}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setAppointmentToDelete(appointment);
                      setShowDeleteConfirmModal(true);
                    }}
                    disabled={isDeleting}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {(data?.data?.length === 0 || !data) && (
              <div className="text-black py-4 text-sm text-center bg-white border">
                No Bookings Right Now!
              </div>
            )}
          </div> */}
              <div>
                {/* Desktop header (hidden on mobile) */}
                <div className="hidden md:grid md:grid-cols-12 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7.5 text-black">
                  <div className="col-span-4 flex items-center min-w-[200px]">
                    <p className="font-bold">Service Name</p>
                  </div>
                  <div className="col-span-4 flex items-center min-w-[150px]">
                    <p className="font-medium">Timings</p>
                  </div>
                  <div className="col-span-2 flex items-center min-w-[150px]">
                    <p className="font-medium">Frequency</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-center min-w-[100px]">
                    <p className="font-medium">Actions</p>
                  </div>
                </div>

                {data?.data?.map((appointment: any, key: number) => (
                  <div key={key} className="border-t border-stroke px-4 py-4 md:px-6 2xl:px-7">
                    {/* Mobile view: single cell display */}
                    <div className="md:hidden space-y-2">
                      <p className="text-md font-bold"><span className="font-bold">Service: </span> {appointment.servicetype}</p>
                      <p className="text-sm">
                        <span className="font-bold">Time: </span>  {format(appointment.startDate, "yyyy-MM-dd")} {appointment.startTime} - {format(appointment.endDate, "yyyy-MM-dd")} {appointment.endTime}
                      </p>
                      <p className="text-sm text-meta-3">
                        <span className="font-bold">Frequency: </span>
                        {appointment.frequency}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">Actions:</p>

                        <div className="flex space-x-3 mt-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              setEditingAppointment(appointment);
                              setServiceType(appointment.servicetype);
                              setFrequency(appointment.frequency);
                              setSelectedRange({
                                startDate: appointment.startDate,
                                endDate: appointment.endDate,
                              });
                              setSelectedTimeRange({
                                startTime: appointment.startTime,
                                endTime: appointment.endTime,
                              });
                              setIsModalOpen(true);
                            }}
                          >
                            <FiEdit size={20} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              setAppointmentToDelete(appointment);
                              setShowDeleteConfirmModal(true);
                            }}
                            disabled={isDeleting}
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop view: grid layout */}
                    <div className="hidden md:grid md:grid-cols-12">
                      <div className="col-span-4">
                        <p className="text-md font-bold"> {appointment.servicetype}</p>
                      </div>
                      <div className="col-span-4 flex items-center">
                        <p className="text-sm">
                          {format(appointment.startDate, "yyyy-MM-dd")} {appointment.startTime} - {format(appointment.endDate, "yyyy-MM-dd")} {appointment.endTime}
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <p className="text-sm text-meta-3">{appointment.frequency}</p>
                      </div>
                      <div className="col-span-2 flex justify-center items-center space-x-3">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => {
                            setEditingAppointment(appointment);
                            setServiceType(appointment.servicetype);
                            setFrequency(appointment.frequency);
                            setSelectedRange({
                              startDate: appointment.startDate,
                              endDate: appointment.endDate,
                            });
                            setSelectedTimeRange({
                              startTime: appointment.startTime,
                              endTime: appointment.endTime,
                            });
                            setIsModalOpen(true);
                          }}
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setAppointmentToDelete(appointment);
                            setShowDeleteConfirmModal(true);
                          }}
                          disabled={isDeleting}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {(data?.data?.length === 0 || !data) && (
                  <div className="text-black py-4 text-sm text-center bg-white border">
                    No Bookings Right Now!
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsTable;