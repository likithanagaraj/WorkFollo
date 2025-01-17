"use client";

import { cn } from "@/lib/utils";
import { getLocalTimeZone, today, CalendarDate, DateDuration } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { Button as Button2 } from "./ui/button";
import { useState } from 'react';

interface DateRange {
  start: CalendarDate;
  end: CalendarDate;
}

export default function SmartDateRangePicker() {
  const now = today(getLocalTimeZone());
  const tz = getLocalTimeZone();
  
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getDateRange = (range: string): DateRange => {
    const currentDate = today(tz);
    let start: CalendarDate;
    let end: CalendarDate;

    switch (range) {
      case 'this-week': {
        start = currentDate.subtract({ days: currentDate.toDate(tz).getDay() });
        end = start.add({ days: 6 });
        break;
      }
      case 'last-week': {
        start = currentDate.subtract({ days: currentDate.toDate(tz).getDay() + 7 });
        end = start.add({ days: 6 });
        break;
      }
      case 'this-month': {
        start = new CalendarDate(currentDate.year, currentDate.month, 1);
        end = start.add({ months: 1 }).subtract({ days: 1 });
        break;
      }
      case 'last-month': {
        start = new CalendarDate(currentDate.year, currentDate.month, 1).subtract({ months: 1 });
        end = start.add({ months: 1 }).subtract({ days: 1 });
        break;
      }
      case 'this-year': {
        start = new CalendarDate(currentDate.year, 1, 1);
        end = new CalendarDate(currentDate.year, 12, 31);
        break;
      }
      case 'last-year': {
        start = new CalendarDate(currentDate.year - 1, 1, 1);
        end = new CalendarDate(currentDate.year - 1, 12, 31);
        break;
      }
      default:
        start = currentDate;
        end = currentDate;
    }

    return { start, end };
  };

  const handleRangeSelect = (range: string) => {
    const newRange = getDateRange(range);
    setDateRange(newRange);
    setIsOpen(false);
  };

  return (
    <DateRangePicker 
      value={dateRange} 
      onChange={setDateRange}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <Label className="text-sm font-medium text-foreground">
        Date range picker
      </Label>
      <div className="flex">
        <Group className="inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
          <DateInput slot="start">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
              />
            )}
          </DateInput>
          <span aria-hidden="true" className="px-2 text-muted-foreground/70">
            -
          </span>
          <DateInput slot="end">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
              />
            )}
          </DateInput>
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="flex max-h-[inherit] overflow-auto p-2">
          <RangeCalendar 
            value={dateRange}
            onChange={setDateRange}
            className="w-fit"
          >
            <header className="flex w-full items-center gap-1 pb-1">
              <Button
                slot="previous"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </Button>
              <Heading className="grow text-center text-sm font-medium" />
              <Button
                slot="next"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </Button>
            </header>
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody className="[&_td]:px-0">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={cn(
                      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground outline-offset-2 duration-150 [transition-property:border-radius,box-shadow] focus-visible:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[selected]:rounded-none data-[selection-end]:rounded-e-lg data-[selection-start]:rounded-s-lg data-[hovered]:bg-accent data-[invalid]:bg-red-100 data-[selected]:bg-accent data-[hovered]:text-foreground data-[selected]:text-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selection-end]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selection-start]:[&:not([data-hover])]:bg-destructive data-[selection-end]:[&:not([data-hover])]:bg-primary data-[selection-start]:[&:not([data-hover])]:bg-primary data-[invalid]:data-[selection-end]:[&:not([data-hover])]:text-destructive-foreground data-[invalid]:data-[selection-start]:[&:not([data-hover])]:text-destructive-foreground data-[selection-end]:[&:not([data-hover])]:text-primary-foreground data-[selection-start]:[&:not([data-hover])]:text-primary-foreground",
                      date.compare(now) === 0 &&
                        "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selection-end]:[&:not([data-hover])]:after:bg-background data-[selection-start]:[&:not([data-hover])]:after:bg-background"
                    )}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </RangeCalendar>
          <div className="flex flex-col gap-1 mt-5 ml-2">
            <Button2 
              onClick={() => handleRangeSelect('this-week')} 
              variant="secondary"
            >
              This Week
            </Button2>
            <Button2 
              onClick={() => handleRangeSelect('last-week')} 
              variant="secondary"
            >
              Last Week
            </Button2>
            <Button2 
              onClick={() => handleRangeSelect('this-month')} 
              variant="secondary"
            >
              This Month
            </Button2>
            <Button2 
              onClick={() => handleRangeSelect('last-month')} 
              variant="secondary"
            >
              Last Month
            </Button2>
            <Button2 
              onClick={() => handleRangeSelect('this-year')} 
              variant="secondary"
            >
              This Year
            </Button2>
            <Button2 
              onClick={() => handleRangeSelect('last-year')} 
              variant="secondary"
            >
              Last Year
            </Button2>
          </div>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}

