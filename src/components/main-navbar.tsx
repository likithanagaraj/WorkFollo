"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { redirect, usePathname } from "next/navigation";
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
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

function MainNavbar() {
  const { data: session } = useSession();
  // if (!session?.user) {
  //   return <div>hi</div>
  // }
  // console.log(session);
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  const username = session?.user?.email?.slice(
    0,
    session?.user?.email?.indexOf("@")
  ) as string;
  const label =
    currentPath === "clients"
      ? "Clients"
      : currentPath === "projects"
      ? "Projects"
      : currentPath === "transactions"
      ? "Transactions"
      : "Dashboard";

  return (
    <nav className="h-[70px] border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
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
                <AvatarFallback className="uppercase">{username}</AvatarFallback>
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
              <DropdownMenuItem>
                <UserPen
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Option 5</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
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
        {/* <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-lg">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback>LN</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{username}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </button>
          </SheetTrigger>
          
          <SheetContent className="w-[400px]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold">Profile</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="w-32 h-32 border-4 border-primary/30">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback className="text-3xl">LN</AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
                <p className="text-sm text-primary mt-1">System Administrator</p>
              </div>
              
              <div className="w-full space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg">
                  <User className="text-gray-600" size={20} />
                  <span>Profile Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg">
                  <Settings className="text-gray-600" size={20} />
                  <span>Account Settings</span>
                </button>
                <button onClick={(e)=>{
                  signOut({ callbackUrl: '/' })
                }} className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg text-red-500">
                  <LogOut className="" size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet> */}
      </div>
    </nav>
  );
}

export default MainNavbar;
