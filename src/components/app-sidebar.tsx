"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartLine,
  Command,
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

// This is sample data.
const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/app",
      icon: Home,
      isActive: true,  
     
    },
    {
      title: "Clients",
      url: "/app/clients",
      icon: User,
    },
    {
      title: "Projects",
      url: "/app/projects",
      icon: BookOpen,
     
    },
    {
      title: "Transcations",
      url: "/app/transactions",
      icon: ChartLine,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
