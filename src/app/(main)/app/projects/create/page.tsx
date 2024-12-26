"use client";

import ProjectForm from "@/components/project-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import React from "react";

// function CreateNav(){

//   const Pathname = usePathname()
//   const title = Pathname.split('/')[2]?.replace(/^\w/, (c) => c.toUpperCase()) || '';
//   const backPath = Pathname.split('/').slice(0, -1).join('/')

//   return(
//     <nav className='flex justify-between items-center h-12 border-b w-full' >
//       <CreateButton link={backPath} className=' rounded-none h-12 px-5 bg-white shadow-none text-gray-600 border'><X/></CreateButton>
//       <h1 className='text-[24px] font-semibold '>Create {title}</h1>
//       <CreateButton link={backPath} className='rounded-none h-12 px-8 capitalize'>Create{title}</CreateButton>
//     </nav>
//   )
// }

function page() {
  return (
    <div className="flex flex-col  gap-4 m-8">
      {/* <h2>What&apos;s your Project?</h2> */}
      <Link
        href={"/app/projects"}
        className="flex gap-2 text-[18px] items-center text-primary/60"
      >
        <ArrowLeft size={16} />
        Back
      </Link>
      <ProjectForm />
    </div>
  );
}

export default page;
