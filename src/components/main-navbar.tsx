"use client";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { usePathname } from "next/navigation";

function MainNavbar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  console.log(currentPath);
  const label =
    currentPath == "clients"
      ? "Client"
      : currentPath == "projects"
      ? "Project"
      : currentPath == "transactions"
      ? "Transaction"
      : "";
  // ?.replace(/^\w/, (c) => c.toUpperCase()) || '';

  return (
    <nav className="h-[60px] border-b border-[#E5E5E5]   flex items-center  justify-between  px-8 ">
      <h1 className="text-xl font-semibold ">{label}</h1>
      <div>
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          <AvatarFallback className="border-2">LN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default MainNavbar;
