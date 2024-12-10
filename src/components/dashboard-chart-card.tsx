"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";

const chartConfig = {
  visitors: {
    label: "Visitors",
    // color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Chrome",
    // color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    // color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    // color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    // color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    // color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
import {
  ChartConfig,

} from "@/components/ui/chart";
import { ProjectTackerGraph } from "./project-track-graph";
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "" },
//   { browser: "safari", visitors: 200, fill: "" },
//   { browser: "firefox", visitors: 187, fill: "" },
//   { browser: "edge", visitors: 173, fill: "" },
//   { browser: "other", visitors: 90, fill: "" },
// ];

interface Props {
  title: string;
  amount: string;
}

export default function DashboardEachChart({ title, amount }: Props) {
  return (
    <Card className="max-w-xs border ">
      <CardHeader className="p-4 pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{amount}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
          1,254
          <span className="text-sm font-normal text-muted-foreground">
            kcal/day
          </span>
        </div>
        <div>
        {/* <ProjectTackerGraph /> */}
        </div>
      </CardContent>
      
    </Card>
  );
}
