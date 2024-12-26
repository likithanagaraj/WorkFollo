"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
   
  }[]
}) 

{
  const pathname = usePathname();
  const isActive = (itemUrl: string) => {
    if (itemUrl === '/app') {
      return pathname === '/app';
    }
    return pathname.startsWith(itemUrl + '/') || pathname === itemUrl;
  };
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu className="mt-3 ml-2">
        {items.map((item) => (
            <SidebarMenuItem className={  isActive(item.url) ? "text-black font-bold  ":"text-red"} key={item.title}>
              
                <SidebarMenuButton onClick={() => window.location.href = item.url} tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span  className="text-[14px]" >{item.title}</span>
                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                </SidebarMenuButton>

             
            </SidebarMenuItem>
          
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
