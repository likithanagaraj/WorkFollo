"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  // const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu className="pt-2">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href={'/app'} className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Image
                  src={"/assets/logo-base-256x256.png"}
                  width={30}
                  height={30}
                  alt="logo"
                />
              </Link>
              <div className="flex  gap-2  text-left text-[16px] leading-tight ">
                <span className="truncate font-semibold ">WorkFollo</span>
                <Badge variant={"secondary"} className="scale-90">Beta</Badge>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
