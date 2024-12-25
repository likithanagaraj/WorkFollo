"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { date: "2024-01-01", revenue: 222 },
  { date: "2024-02-02", revenue: 97 },
  { date: "2024-03-03", revenue: 167 },
  { date: "2024-04-04", revenue: 242 },
  { date: "2024-05-05", revenue: 373 },
  { date: "2024-06-06", revenue: 301 },
  { date: "2024-07-07", revenue: 245 },
  { date: "2024-08-08", revenue: 409 },
  { date: "2024-09-09", revenue: 59 },
  { date: "2024-10-10", revenue: 261 },
  { date: "2024-11-11", revenue: 327 },
  { date: "2024-12-12", revenue: 292 },
];



const chartConfig = {
  views: {
    label: "Revenue",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RevenueGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("revenue");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Revenue</CardTitle>
          {/* <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription> */}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
                  // day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      // day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
