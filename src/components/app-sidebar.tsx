import {  LucideUserCircle,  FilesIcon,ChartLine,  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Clients",
    url: "../../app/clients",
    icon: LucideUserCircle ,
  },
  {
    title: "Projects",
    url: "../../app/projects",
    icon: FilesIcon,
  },
  {
    title: "Transcations",
    url: "../../app/transactions",
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
]

export function AppSidebar() {
  return (
    <Sidebar  variant="sidebar" className="">
      <SidebarContent className="bg-[#FFFFFF] ">
        <SidebarGroup className="py-2  ">
          <SidebarGroupLabel className="text-[17px] font-bold pl-5">Freelance Flow</SidebarGroupLabel >
          <SidebarGroupContent className="">
            <SidebarMenu className="gap-5 py-5">
              {items.map((item) => (
                <SidebarMenuItem className="pl-4" key={item.title}>
                  <SidebarMenuButton className=""  asChild>
                    <Link className="" href={item.url}>
                      <span className=""><item.icon    /></span>
                      <span className="text-[15px] font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
