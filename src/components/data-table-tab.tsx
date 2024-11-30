import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DataTableTab({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  return (
    <div className="border bg-white">
      <Tabs defaultValue={tabs[0]?.label || ""} className="">
        <TabsList className="bg-white border-b">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              className="rounded-sm text-[15px] font-medium text-gray-500 hover:border"
              value={tab.label}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.label} className="min-h-60  text-center pt-20" value={tab.label}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default DataTableTab;
