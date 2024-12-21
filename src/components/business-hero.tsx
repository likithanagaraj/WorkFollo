"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelsTopLeft, Box, House } from "lucide-react";

const metrics = [
  {
    label: "Save time & money",
    value: "8h",
    unit: "/ week",
    description:
      "Save up to 8h per week for you or your clients with automated payments & reconciliation.",
  },
  {
    label: "Broaden your offering",
    value: "50%",
    unit: "",
    description:
      "Earn up to 50% more revenue per client from payments, cash flow and credit control services.",
  },
  {
    label: "Build deeper relationships",
    value: "1x",
    unit: "/ quarter week",
    description:
      "Get happier clients with effortless payments. Add value continuously for deeper relationships.",
  },
];

export default function BusinessHero() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#FFFDF7]">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Get back to business
            <br />
            with effortless management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save time and money with a cost-effective management platform with
            easy usage.
          </p>
        </div>

        <Tabs defaultValue="tab-1 ">
          <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0 w-52">
            <TabsTrigger
              value="tab-1"
              className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <House
                className="mb-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <PanelsTopLeft
                className="mb-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            >
              <Box
                className="mb-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Packages
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 1
            </p>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 2
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 3
            </p>
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white/50 backdrop-blur-sm space-y-4"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-7xl font-bold">{metric.value}</span>
                <span className="text-muted-foreground">{metric.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
