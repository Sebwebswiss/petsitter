// import React from "react";

// interface Time {
//   label: string; // e.g. "1:00 AM"
//   value: string; // e.g. "01:00"
// }

// interface BookedData {
//   disabledDates: string[];
//   disabledTimeSlots: Record<string, string[]>;
// }

// interface SelectTimeProps {
//   selectedTimeRange: { startTime: string; endTime: string };
//   setSelectedTimeRange: (range: { startTime: string; endTime: string }) => void;
//   selectedDate: { startDate: string; endDate: string };
//   bookedData?: BookedData;
// }

// const SelectTime: React.FC<SelectTimeProps> = ({
//   selectedTimeRange,
//   setSelectedTimeRange,
//   selectedDate,
//   bookedData,
// }) => {
//   // Generate full time slots for the dropdowns (every 30 minutes)
//   const generateTimeSlots = (): Time[] => {
//     const times: Time[] = [];
//     for (let hour = 0; hour < 24; hour++) {
//       for (let min of [0, 30]) {
//         const period = hour < 12 ? "AM" : "PM";
//         const displayHour = hour % 12 || 12;
//         const formattedMin = min.toString().padStart(2, "0");
//         const formattedTime = `${displayHour}:${formattedMin} ${period}`;
//         // Use 24-hour format (padded) as value to match bookedData
//         const valueTime = `${hour.toString().padStart(2, "0")}:${formattedMin}`;
//         times.push({ label: formattedTime, value: valueTime });
//       }
//     }
//     return times;
//   };

//   const allTimeSlots = generateTimeSlots();

//   // Use selectedDate.startDate as the key (assumed in "YYYY-MM-DD" format)
//   const selectedDateKey = selectedDate.startDate;

//   // Get disabled slots for the selected date from bookedData (or empty array if none)
//   const disabledSlotsForDate =
//     bookedData?.disabledTimeSlots?.[selectedDateKey] || [];

//   // Calculate the last disabled slot (if any) so that it is always available
//   const sortedDisabledSlots = [...disabledSlotsForDate].sort();
//   const lastDisabledSlot =
//     sortedDisabledSlots.length > 0
//       ? sortedDisabledSlots[sortedDisabledSlots.length - 1]
//       : "";

//   // Filter available time slots
//   // Include a slot if it is not disabled,
//   // OR if it matches the currently selected endTime,
//   // OR if it is the last disabled slot.
//   const availableTimeSlots = allTimeSlots.filter(
//     (slot) =>
//       !disabledSlotsForDate.includes(slot.value) ||
//       slot.value === selectedTimeRange.endTime ||
//       slot.value === lastDisabledSlot
//   );

//   // Split available slots into AM and PM groups
//   const amSlots = availableTimeSlots.filter((slot) => {
//     const hour = Number(slot.value.split(":")[0]);
//     return hour < 12;
//   });
//   const pmSlots = availableTimeSlots.filter((slot) => {
//     const hour = Number(slot.value.split(":")[0]);
//     return hour >= 12;
//   });

//   const formatDate = (date: Date | string) => {
//     const dateObj = typeof date === "string" ? new Date(date) : date;
//     return dateObj.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="flex flex-col items-center w-full mt-4 space-y-4">
//       <div className="flex space-x-4">
//         {/* Start Time Dropdown */}
//         <div className="flex flex-col">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Start Time
//           </label>
//           {availableTimeSlots.length > 0 ? (
//             <select
//               value={selectedTimeRange.startTime}
//               onChange={(e) =>
//                 setSelectedTimeRange({
//                   ...selectedTimeRange,
//                   startTime: e.target.value,
//                 })
//               }
//               className="border border-gray-300 rounded-md px-4 py-2 w-full"
//             >
//               <option value={""}>Select</option>
//               {availableTimeSlots.map((time) => (
//                 <option key={time.value} value={time.value}>
//                   {time.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <div className="text-red-500">
//               No slot available for {formatDate(selectedDate.startDate)}
//             </div>
//           )}
//           <p className="text-xs mt-1 text-center text-black">
//             {selectedDate.startDate && formatDate(selectedDate.startDate)}
//           </p>
//         </div>

//         {/* End Time Dropdown */}
//         <div className="flex flex-col">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             End Time
//           </label>
//           {availableTimeSlots.length > 0 ? (
//             <select
//               value={selectedTimeRange.endTime}
//               onChange={(e) =>
//                 setSelectedTimeRange({
//                   ...selectedTimeRange,
//                   endTime: e.target.value,
//                 })
//               }
//               className="border border-gray-300 rounded-md px-4 py-2 w-full"
//             >
//               <option value={""}>Select</option>

//               {availableTimeSlots.map((time) => (
//                 <option key={time.value} value={time.value}>
//                   {time.label}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <div className="text-red-500">
//               No slot available for {formatDate(selectedDate.startDate)}
//             </div>
//           )}
//           <p className="text-xs mt-1 text-center text-black">
//             {selectedDate.endDate && formatDate(selectedDate.endDate)}
//           </p>
//         </div>
//       </div>

//       <h3 className="font-bold">Available Time Slots</h3>
//       <div className="flex space-x-10 justify-center w-full">
//         <div className="flex space-x-10 justify-center w-full">
//           {/* AM Section */}
//           <div className="flex flex-col">
//             <h3 className="text-base font-semibold text-center mb-4">AM</h3>
//             {amSlots.length > 0 ? (
//               <div className="grid grid-cols-2 gap-2">
//                 {amSlots.map((slot) => (
//                   <button
//                     key={slot.value}
//                     className="text-xs rounded-md px-1 md:px-4 py-1 bg-primary text-white whitespace-nowrap"
//                   >
//                     {slot.label}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-red-500">No AM slots available</div>
//             )}
//           </div>

//           {/* PM Section */}
//           <div className="flex flex-col">
//             <h3 className="text-base font-semibold text-center mb-4">PM</h3>
//             {pmSlots.length > 0 ? (
//               <div className="grid grid-cols-2 gap-2">
//                 {pmSlots.map((slot) => (
//                   <button
//                     key={slot.value}
//                     className="text-xs rounded-md px-1 md:px-4 py-1 bg-primary text-white whitespace-nowrap"
//                   >
//                     {slot.label}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-red-500">No PM slots available</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectTime;

import React from "react";

interface Time {
  label: string;
  value: string;
  isDisabled?: boolean;
}

interface BookedData {
  disabledDates: string[];
  disabledTimeSlots: Record<string, string[]>;
}

interface SelectTimeProps {
  selectedTimeRange: { startTime: string; endTime: string };
  setSelectedTimeRange: (range: { startTime: string; endTime: string }) => void;
  selectedDate: { startDate: string; endDate: string };
  bookedData?: BookedData;
}

const SelectTime: React.FC<SelectTimeProps> = ({
  selectedTimeRange,
  setSelectedTimeRange,
  selectedDate,
  bookedData,
}) => {
  const generateTimeSlots = (): Time[] => {
    const times: Time[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min of [0, 30]) {
        const period = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 || 12;
        const formattedMin = min.toString().padStart(2, "0");
        const formattedTime = `${displayHour}:${formattedMin} ${period}`;
        const valueTime = `${hour.toString().padStart(2, "0")}:${formattedMin}`;
        times.push({ label: formattedTime, value: valueTime });
      }
    }
    return times;
  };

  const allTimeSlots = generateTimeSlots();
  const selectedDateKey = selectedDate.startDate;
  const disabledSlotsForDate = bookedData?.disabledTimeSlots?.[selectedDateKey] || [];

  const allSlotsWithStatus: Time[] = allTimeSlots.map((slot) => ({
    ...slot,
    isDisabled: disabledSlotsForDate.includes(slot.value),
  }));

  const amSlots = allSlotsWithStatus.filter((slot) => Number(slot.value.split(":" )[0]) < 12);
  const pmSlots = allSlotsWithStatus.filter((slot) => Number(slot.value.split(":" )[0]) >= 12);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center w-full mt-4 space-y-4">
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <select
            value={selectedTimeRange.startTime}
            onChange={(e) =>
              setSelectedTimeRange({
                ...selectedTimeRange,
                startTime: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          >
            <option value={""}>Select</option>
            {allSlotsWithStatus.map((time) => (
              <option
                key={time.value}
                value={time.value}
                disabled={time.isDisabled && time.value !== selectedTimeRange.startTime}
                className={time.isDisabled ? "text-red-500" : ""}
              >
                {time.label} {time.isDisabled ? "(booked)" : ""}
              </option>
            ))}
          </select>
          <p className="text-xs mt-1 text-center text-black">
            {selectedDate.startDate && formatDate(selectedDate.startDate)}
          </p>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <select
            value={selectedTimeRange.endTime}
            onChange={(e) =>
              setSelectedTimeRange({
                ...selectedTimeRange,
                endTime: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          >
            <option value={""}>Select</option>
            {allSlotsWithStatus.map((time) => (
              <option
                key={time.value}
                value={time.value}
                disabled={time.isDisabled && time.value !== selectedTimeRange.endTime}
                className={time.isDisabled ? "text-red-500" : ""}
              >
                {time.label} {time.isDisabled ? "(booked)" : ""}
              </option>
            ))}
          </select>
          <p className="text-xs mt-1 text-center text-black">
            {selectedDate.endDate && formatDate(selectedDate.endDate)}
          </p>
        </div>
      </div>

      <h3 className="font-bold">Available Time Slots</h3>
      <div className="flex space-x-10 justify-center w-full">
        <div className="flex space-x-10 justify-center w-full">
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-center mb-4">AM</h3>
            <div className="grid grid-cols-2 gap-2">
              {amSlots.map((slot) => (
                <button
                  key={slot.value}
                  disabled={slot.isDisabled}
                  className={`text-xs rounded-md px-1 md:px-4 py-1 whitespace-nowrap ${
                    slot.isDisabled
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-center mb-4">PM</h3>
            <div className="grid grid-cols-2 gap-2">
              {pmSlots.map((slot) => (
                <button
                  key={slot.value}
                  disabled={slot.isDisabled}
                  className={`text-xs rounded-md px-1 md:px-4 py-1 whitespace-nowrap ${
                    slot.isDisabled
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
