"use client";
import ClientForm from "@/components/client-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import React from "react";

// function CreateNav() {
//   const Pathname = usePathname();
//   const title =
//     Pathname.split("/")[2]?.replace(/^\w/, (c) => c.toUpperCase()) || "";
//   const backPath = Pathname.split("/").slice(0, -1).join("/");

//   return (
//     <nav className="flex justify-between items-center h-12 border-b w-full">
//       <CreateButton
//         link={backPath}
//         className=" rounded-none h-12 px-5 bg-white shadow-none text-gray-600 border"
//       >
//         <X />
//       </CreateButton>
//       <h1 className="text-[24px] font-semibold ">Create {title}</h1>
//       <CreateButton link={backPath} className="rounded-none h-12 px-8 ">
//         CREATE CLIENTS
//       </CreateButton>
//     </nav>
//   );
// }

function page() {
  return (
    <div className="">

      <div className="flex flex-col gap-5">
        <section className="flex flex-col mx-8 ">
          <Link
            href={"/app/clients"}
            className="flex gap-2 text-[18px] items-center text-primary/60"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <h2>Add the clients</h2>
          {/* <h3 className="ml-10 font-medium py-2">Add new client</h3> */}
        </section>
        <ClientForm />
      </div>
    </div>
  );
}

export default page;
