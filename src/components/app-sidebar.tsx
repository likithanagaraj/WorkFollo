import {
  LucideUserCircle,
  FilesIcon,
  ChartLine,
  LucideHome,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: Home,
  },
  {
    title: "Clients",
    url: "/app/clients",
    icon: LucideUserCircle,
  },
  {
    title: "Projects",
    url: "/app/projects",
    icon: FilesIcon,
  },
  {
    title: "Transcations",
    url: "/app/transactions",
    icon: ChartLine,
  },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="">
      <SidebarContent className="bg-[#FFFFFF] ">
        <SidebarGroup className=" ">
          <SidebarGroupLabel className="text-[20px]  text-black   font-bold mb-5">Freelance Flow
          {/* <SidebarTrigger /> */}
          </SidebarGroupLabel>
         
          <SidebarGroupContent className="">
            <SidebarMenu className="gap-5 ">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <Link className="" href={item.url}>
                      <span className="">
                        <item.icon />
                      </span>
                      <span className="text-[15px] font-bold">
                        {item.title}
                      </span>
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
