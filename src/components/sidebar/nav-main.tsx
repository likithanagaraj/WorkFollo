"use client";

import { ChevronRight, CircleHelp, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    description?: string;
  }[];
}) {
  const pathname = usePathname();
  const isActive = (itemUrl: string) => {
    if (itemUrl === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(itemUrl + "/") || pathname === itemUrl;
  };
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu className="mt-3 ">
        <TooltipProvider delayDuration={0}>
          {items.map((item) => (
            <SidebarMenuItem
              className={
                isActive(item.url) ? "text-black font-bold  " : "text-red"
              }
              key={item.title}
            >
              <SidebarMenuButton
                onClick={() => (window.location.href = item.url)}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}

                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="ml-auto scale-90 inline"
                    >
                      <CircleHelp  className="inline"/>
                    </Button> */}
                    <span className="text-[14px] ">{item.title} </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className=" px-2 py-1 text-xs"
                    // showArrow={true}
                  >
                    {item.description}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </TooltipProvider>
      </SidebarMenu>
    </SidebarGroup>
  );
}
