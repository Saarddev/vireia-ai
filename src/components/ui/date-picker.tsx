
"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  mode?: "single" | "range" | "multiple";
  initialFocus?: boolean;
}

export function DatePicker({
  date,
  onSelect,
  className,
  mode = "single",
  initialFocus
}: DatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        mode={mode as any}
        selected={date}
        onSelect={onSelect}
        initialFocus={initialFocus}
        className="p-3 pointer-events-auto"
      />
    </div>
  );
}
