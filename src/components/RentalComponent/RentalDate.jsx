"use client";

import * as React from "react";
import {
  format,
  isSameDay,
  parseISO,
  isWithinInterval,
  addDays,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RentalDatePicker({
  label = "Pick a date",
  value,
  onChange,
  unavailableDateRanges = [],
  minDate = new Date(),
  maxDate,
  className,
  disabled = false,
}) {
  // Function to check if a date is within any of the unavailable date ranges
  const isDateUnavailable = (date) => {
    // Always disable past dates
    if (date < new Date().setHours(0, 0, 0, 0)) {
      return true;
    }

    // Check if the date is within any unavailable range
    return unavailableDateRanges.some((range) => {
      const startDate =
        typeof range.start === "string" ? parseISO(range.start) : range.start;
      const endDate =
        typeof range.end === "string" ? parseISO(range.end) : range.end;

      return isWithinInterval(date, { start: startDate, end: endDate });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={isDateUnavailable}
          initialFocus
          fromDate={minDate}
          toDate={maxDate}
          className="border-none shadow-none"
        />
      </PopoverContent>
    </Popover>
  );
}

// Example usage component with separate rental and return date pickers
export function RentalDateRangePicker({
  rentalDate,
  setRentalDate,
  returnDate,
  setReturnDate,
  unavailableDateRanges = [],
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Tanggal Pengambilan</label>
        <RentalDatePicker
          label="Pilih tanggal pengambilan"
          value={rentalDate}
          onChange={setRentalDate}
          unavailableDateRanges={unavailableDateRanges}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tanggal Pengembalian</label>
        <RentalDatePicker
          label="Pilih tanggal pengembalian"
          value={returnDate}
          onChange={setReturnDate}
          unavailableDateRanges={unavailableDateRanges}
          minDate={rentalDate ? addDays(rentalDate, 1) : new Date()}
          disabled={!rentalDate}
        />
      </div>
    </div>
  );
}
