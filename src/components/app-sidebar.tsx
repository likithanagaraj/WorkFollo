"use client";

import { LucideUserCircle, FilesIcon, ChartLine, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./logo";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/app",
    icon: Home,
  },
  {
    title: "Clients",
    url: "/app/clients",
    // url2: "/app/clients/**",
    icon: LucideUserCircle,
  },
  {
    title: "Projects",
    url: "/app/projects",
    // url2: "/app/projects/** " ,
    icon: FilesIcon,
  },
  {
    title: "Transcations",
    url: "/app/transactions",
    // url2: "/app/projects/** " ,
    icon: ChartLine,
  },
  // {
  //   title: "Contract",
  //   url: "/app/contracts",
  //   icon: FilesIcon,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="">
      <SidebarContent >
        <SidebarGroup >
          <SidebarGroupLabel className="text-[20px]  text-black   font-bold mb-5">
            <Logo
              full
              link
              width={30}
              height={30}
              textClassName="text-lg"
              className="flex-row text-md items-center gap-1 mt-5"
            />

            {/* <SidebarTrigger /> */}
          </SidebarGroupLabel>

          <SidebarGroupContent className="">
            <SidebarMenu className=" ">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <Link
                      className={cn("", path === item.url && "text-primary")}
                      href={item.url}
                    >
                      <item.icon size={18} />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
