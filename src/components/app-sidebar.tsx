"use client";

import {
  LucideUserCircle,
  FilesIcon,
  ChartLine,
  Home,
} from "lucide-react";

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
    url: "/app/projects" ,
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
  // console.log(path)
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="">
      <SidebarContent className="bg-[#FFFFFF] ">
        <SidebarGroup className=" ">
          <SidebarGroupLabel className="text-[20px]  text-black   font-bold mb-5">
            Freelance Flow
            {/* <SidebarTrigger /> */}
          </SidebarGroupLabel>

          <SidebarGroupContent className="">
            <SidebarMenu className=" ">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <Link className={cn('', path === item.url  && "text-primary")} href={item.url}>
                      <span className="">
                        <item.icon size={18} />
                      </span>
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
