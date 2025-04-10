import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { parse, isBefore, isAfter, startOfDay, format as formatDateFn } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface BookedData {
  disabledDates: string[]; // array of "YYYY-MM-DD" strings
  disabledTimeSlots: Record<string, string[]>;
}

interface SelectDateProps {
  selectedRange: { startDate: string; endDate: string }; // stored as strings
  setSelectedRange: (range: { startDate: string; endDate: string }) => void;
  bookedData?: BookedData;
}

const SelectDate: React.FC<SelectDateProps> = ({
  selectedRange,
  setSelectedRange,
  bookedData,
}) => {
  // Create valid Date objects by appending "T00:00:00" to ensure full ISO format.
  const validStartDate = selectedRange.startDate
    ? new Date(selectedRange.startDate + "T00:00:00")
    : new Date();
  const validEndDate = selectedRange.endDate
    ? new Date(selectedRange.endDate + "T00:00:00")
    : new Date();

  const initialRange = [
    {
      startDate: validStartDate,
      endDate: validEndDate,
      key: "selection",
    },
  ];
  const [range, setRange] = useState(initialRange);

  // Convert bookedData.disabledDates to Date objects, filtering out invalid ones.
  const disabledDates: Date[] = bookedData?.disabledDates
    ? bookedData.disabledDates
        .map((dateStr) => new Date(dateStr + "T00:00:00"))
        .filter((d) => !isNaN(d.getTime()))
    : [];

  // Helper: Convert a Date to "YYYY-MM-DD" string
  const toYyyyMmDd = (date: Date) => formatDateFn(date, "yyyy-MM-dd");

  const handleSelect = (ranges: any) => {
    let { startDate, endDate } = ranges.selection;
    if (isBefore(endDate, startDate)) {
      endDate = startDate;
    }
    setRange([{ startDate, endDate, key: "selection" }]);
    setSelectedRange({
      startDate: toYyyyMmDd(startDate),
      endDate: toYyyyMmDd(endDate),
    });
  };

  const handleManualInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "startDate" | "endDate"
  ) => {
    const dateString = e.target.value; // e.g. "2025-03-10"
    let newDate = parse(dateString, "yyyy-MM-dd", new Date());
    if (!isNaN(newDate.getTime())) {
      newDate = startOfDay(newDate);
      if (isBefore(newDate, startOfDay(new Date()))) return;

      // Create Date objects from the stored strings (with appended time)
      const currentStart = selectedRange.startDate
        ? new Date(selectedRange.startDate + "T00:00:00")
        : new Date();
      const currentEnd = selectedRange.endDate
        ? new Date(selectedRange.endDate + "T00:00:00")
        : new Date();
      let updatedStart = currentStart;
      let updatedEnd = currentEnd;
      if (type === "startDate") {
        updatedStart = newDate;
        if (isAfter(updatedStart, updatedEnd)) {
          updatedEnd = updatedStart;
        }
      } else {
        updatedEnd = newDate;
        if (isBefore(updatedEnd, updatedStart)) {
          updatedStart = updatedEnd;
        }
      }
      setSelectedRange({
        startDate: toYyyyMmDd(updatedStart),
        endDate: toYyyyMmDd(updatedEnd),
      });
      setRange([
        { startDate: updatedStart, endDate: updatedEnd, key: "selection" },
      ]);
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row  gap-4 mb-0 w-full max-w-md">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative flex items-center">
            <input
              type="date"
              value={selectedRange.startDate}
              min={toYyyyMmDd(new Date())}
              onChange={(e) => handleManualInput(e, "startDate")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <div className="relative flex items-center">
            <input
              type="date"
              value={selectedRange.endDate}
              min={selectedRange.startDate}
              onChange={(e) => handleManualInput(e, "endDate")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
        </div>
      </div>
      {/* Date Picker */}
      <DateRange
        ranges={range}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        monthDisplayFormat="MMMM yyyy"
        minDate={new Date()}
        months={1}
        direction="horizontal"
        rangeColors={["#D3B34F"]}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default SelectDate;
