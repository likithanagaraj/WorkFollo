"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import SmartDateRangePicker from "@/components/smart-date-range-picker";

const chartData = [
  { date: "2024-04-01", revenue: 222, expenses: 150 },
  { date: "2024-04-02", revenue: 97, expenses: 180 },
  { date: "2024-04-03", revenue: 167, expenses: 120 },
  { date: "2024-04-04", revenue: 242, expenses: 260 },
  { date: "2024-04-05", revenue: 373, expenses: 290 },
  { date: "2024-04-06", revenue: 301, expenses: 340 },
  { date: "2024-04-07", revenue: 245, expenses: 180 },
  { date: "2024-04-08", revenue: 409, expenses: 320 },
  { date: "2024-04-09", revenue: 59, expenses: 110 },
  { date: "2024-04-10", revenue: 261, expenses: 190 },
  { date: "2024-04-11", revenue: 327, expenses: 350 },
  { date: "2024-04-12", revenue: 292, expenses: 210 },
  { date: "2024-04-13", revenue: 342, expenses: 380 },
  { date: "2024-04-14", revenue: 137, expenses: 220 },
  { date: "2024-04-15", revenue: 120, expenses: 170 },
  { date: "2024-04-16", revenue: 138, expenses: 190 },
  { date: "2024-04-17", revenue: 446, expenses: 360 },
  { date: "2024-04-18", revenue: 364, expenses: 410 },
  { date: "2024-04-19", revenue: 243, expenses: 180 },
  { date: "2024-04-20", revenue: 89, expenses: 150 },
  { date: "2024-04-21", revenue: 137, expenses: 200 },
  { date: "2024-04-22", revenue: 224, expenses: 170 },
  { date: "2024-04-23", revenue: 138, expenses: 230 },
  { date: "2024-04-24", revenue: 387, expenses: 290 },
  { date: "2024-04-25", revenue: 215, expenses: 250 },
  { date: "2024-04-26", revenue: 75, expenses: 130 },
  { date: "2024-04-27", revenue: 383, expenses: 420 },
  { date: "2024-04-28", revenue: 122, expenses: 180 },
  { date: "2024-04-29", revenue: 315, expenses: 240 },
  { date: "2024-04-30", revenue: 454, expenses: 380 },
  { date: "2024-05-01", revenue: 165, expenses: 220 },
  { date: "2024-05-02", revenue: 293, expenses: 310 },
  { date: "2024-05-03", revenue: 247, expenses: 190 },
  { date: "2024-05-04", revenue: 385, expenses: 420 },
  { date: "2024-05-05", revenue: 481, expenses: 390 },
  { date: "2024-05-06", revenue: 498, expenses: 520 },
  { date: "2024-05-07", revenue: 388, expenses: 300 },
  { date: "2024-05-08", revenue: 149, expenses: 210 },
  { date: "2024-05-09", revenue: 227, expenses: 180 },
  { date: "2024-05-10", revenue: 293, expenses: 330 },
  { date: "2024-05-11", revenue: 335, expenses: 270 },
  { date: "2024-05-12", revenue: 197, expenses: 240 },
  { date: "2024-05-13", revenue: 197, expenses: 160 },
  { date: "2024-05-14", revenue: 448, expenses: 490 },
  { date: "2024-05-15", revenue: 473, expenses: 380 },
  { date: "2024-05-16", revenue: 338, expenses: 400 },
  { date: "2024-05-17", revenue: 499, expenses: 420 },
  { date: "2024-05-18", revenue: 315, expenses: 350 },
  { date: "2024-05-19", revenue: 235, expenses: 180 },
  { date: "2024-05-20", revenue: 177, expenses: 230 },
  { date: "2024-05-21", revenue: 82, expenses: 140 },
  { date: "2024-05-22", revenue: 81, expenses: 120 },
  { date: "2024-05-23", revenue: 252, expenses: 290 },
  { date: "2024-05-24", revenue: 294, expenses: 220 },
  { date: "2024-05-25", revenue: 201, expenses: 250 },
  { date: "2024-05-26", revenue: 213, expenses: 170 },
  { date: "2024-05-27", revenue: 420, expenses: 460 },
  { date: "2024-05-28", revenue: 233, expenses: 190 },
  { date: "2024-05-29", revenue: 78, expenses: 130 },
  { date: "2024-05-30", revenue: 340, expenses: 280 },
  { date: "2024-05-31", revenue: 178, expenses: 230 },
  { date: "2024-06-01", revenue: 178, expenses: 200 },
  { date: "2024-06-02", revenue: 470, expenses: 410 },
  { date: "2024-06-03", revenue: 103, expenses: 160 },
  { date: "2024-06-04", revenue: 439, expenses: 380 },
  { date: "2024-06-05", revenue: 88, expenses: 140 },
  { date: "2024-06-06", revenue: 294, expenses: 250 },
  { date: "2024-06-07", revenue: 323, expenses: 370 },
  { date: "2024-06-08", revenue: 385, expenses: 320 },
  { date: "2024-06-09", revenue: 438, expenses: 480 },
  { date: "2024-06-10", revenue: 155, expenses: 200 },
  { date: "2024-06-11", revenue: 92, expenses: 150 },
  { date: "2024-06-12", revenue: 492, expenses: 420 },
  { date: "2024-06-13", revenue: 81, expenses: 130 },
  { date: "2024-06-14", revenue: 426, expenses: 380 },
  { date: "2024-06-15", revenue: 307, expenses: 350 },
  { date: "2024-06-16", revenue: 371, expenses: 310 },
  { date: "2024-06-17", revenue: 475, expenses: 520 },
  { date: "2024-06-18", revenue: 107, expenses: 170 },
  { date: "2024-06-19", revenue: 341, expenses: 290 },
  { date: "2024-06-20", revenue: 408, expenses: 450 },
  { date: "2024-06-21", revenue: 169, expenses: 210 },
  { date: "2024-06-22", revenue: 317, expenses: 270 },
  { date: "2024-06-23", revenue: 480, expenses: 530 },
  { date: "2024-06-24", revenue: 4599, expenses: 180 },
  { date: "2024-06-25", revenue: 141, expenses: 190 },
  { date: "2024-06-26", revenue: 434, expenses: 380 },
  { date: "2024-06-27", revenue: 448, expenses: 490 },
  { date: "2024-06-28", revenue: 149, expenses: 200 },
  { date: "2024-06-29", revenue: 103, expenses: 160 },
  { date: "2024-06-30", revenue: 446, expenses: 400 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component() {
  const [timeRange, setTimeRange] = React.useState("90d");
    // const [dateRange, setDateRange] = React.useState<{ start: CalendarDate; end: CalendarDate } | null>(null);

  const [showExpenses, setShowExpenses] = React.useState(true);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="max-w-3xl mx-auto mt-20">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last timeRange months
          </CardDescription>
        </div>
        <div>
          <SmartDateRangePicker />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
          <Switch
            defaultChecked={showExpenses}
            onCheckedChange={(value) => {
              console.log(value);

              setShowExpenses(value);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            {showExpenses && (
              <Area
                dataKey="expenses"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
