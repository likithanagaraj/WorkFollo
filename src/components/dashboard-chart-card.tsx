"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//     // color: "hsl(var(--chart-2))",
//   },
//   chrome: {
//     label: "Chrome",
//     // color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     // color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     // color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     // color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     // color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;
// import {
//   ChartConfig,

// } from "@/components/ui/chart";
// import { ProjectTackerGraph } from "./project-track-graph";
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
  className?: string;
  tooltip?: string;
}

export default function DashboardEachChart({
  title,
  amount,
  className,
  tooltip,
}: Props) {
  return (
    <Card className={cn("max-w-xs border rounded-lg pl-5 ", className)}>
      <CardHeader className="p-4 pl-2 pb-0">
        <CardTitle className="font-normal text-muted-foreground">
          {title}
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="ml-auto scale-90 inline"
                  >
                    <CircleHelp className="inline" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className=" px-2 py-1 text-xs"
                  // showArrow={true}
                >
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        {/* <CardDescription>{amount}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-2 pt-2">
        <h2 className="flex items-baseline gap-2 text-2xl font-semibold tabular-nums leading-none">
          ₹{amount}
          {/* <span className="text-sm font-normal text-muted-foreground">
            kcal/day
          </span> */}
        </h2>
        <div>{/* <ProjectTackerGraph /> */}</div>
      </CardContent>
    </Card>
  );
}
