"use client";
import CreateButton from "@/components/create-button";
import Tiptap from "@/components/tiptap";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

function CreateNav() {
  const Pathname = usePathname();
  const title =
    Pathname.split("/")[2]?.replace(/^\w/, (c) => c.toUpperCase()) || "";
  const backPath = Pathname.split("/").slice(0, -1).join("/");

  return (
    <nav className="flex justify-between items-center h-12 border-b w-full">
      <CreateButton
        link={backPath}
        className=" rounded-none h-12 px-5 bg-white shadow-none text-gray-600 border"
      >
        <X />
      </CreateButton>
      <h1 className="text-[24px] font-semibold ">Create {title}</h1>
      <CreateButton link={backPath} className="rounded-none h-12 px-8 ">
        CREATE CLIENTS
      </CreateButton>
    </nav>
  );
}



function page() {
  return (
    <div className="flex flex-col justify-center items-center  gap-10 " >
      {/* <CreateNav/> */}
      <div className="flex flex-col gap-8 p-10   ">
        <h1 className="text-4xl font-semibold ">Custom Contract</h1>
       <div className="bg-[#FAFAFA] p-5 w-[1200px]">
       <Tiptap/>
       </div>
      </div>
    </div>
  );
}

export default page;