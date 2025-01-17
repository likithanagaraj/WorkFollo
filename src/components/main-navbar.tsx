"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { SidebarFooter } from "./ui/sidebar";
import { redirect } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bolt,
  BookOpen,
  ChevronDown,
  Layers2,
  Pin,
  UserPen,
  LogOut,
  Settings,
  User,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { NavUser } from "./sidebar/nav-user";

function MainNavbar() {
  const { data: session } = useSession();
  // if (!session?.user) {
  //   return <div>hi</div>
  // }
  // console.log(session);
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  const username = session?.user?.email?.split("@")[0] || "Guest";
  const initials = username.slice(0, 2).toUpperCase();
  const label =
    currentPath === "clients"
      ? "Clients"
      : currentPath === "projects"
      ? "Projects"
      : currentPath === "transactions"
      ? "Transactions"
      : currentPath === "contract"
      ? "Contract"
      : currentPath === "invoice"
      ? "Invoice"
      : "Dashboard";

  return (
    <nav className="h-[65px]   border-gray-200  flex items-center justify-between px-6 ">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-gray-600 hover:text-primary" />
        <h1 className="text-xl font-medium text-gray-800">{label}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        {/* <button className="relative hover:bg-gray-100 p-2 rounded-full">
          <Bell className="text-gray-600" size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button> */}

        {/* Profile Sheet */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Avatar>
                <AvatarImage src="./avatar.jpg" alt="Profile image" />
                <AvatarFallback className="uppercase font-semibold text-[16px] ">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="ms-2 opacity-60"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-64">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                {username}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {session?.user?.email}
              </span>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bolt
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Layers2
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 3</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pin
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 4</span>
              </DropdownMenuItem>
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
              <Sparkles
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Upgrade to pro</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="text-destructive"
            >
              <LogOut
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default MainNavbar;
