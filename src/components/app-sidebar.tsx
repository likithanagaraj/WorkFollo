"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartLine,
  Command,
  File,
  FileBadge,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./sidebar/team-switcher"
import { NavMain } from "./sidebar/nav-main"
import { NavProjects } from "./sidebar/nav-projects"
import { NavUser } from "./sidebar/nav-user"
import { usePathname } from "next/navigation"

// This is sample data.
const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/app",
      icon: Home,
      isActive: true,  
      description: "Overview of your app",
     
    },
    {
      title: "Clients",
      url: "/app/clients" ,
      icon: User,
      description: "Manage your clients "
    },
    {
      title: "Projects",
      url: "/app/projects",
      icon: BookOpen,
      description: "Manage your projects"
     
    },
    {
      title: "Transcations",
      url: "/app/transactions",
      icon: ChartLine,
      description: "View your transcations"
    
    },
    {
      title: "Contracts",
      url: "/app/contract",
      icon: File,
    
    },
    {
      title: "Invoice",
      url: "/app/invoice",
      icon: FileBadge,
    
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  )
}
