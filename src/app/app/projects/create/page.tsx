
"use client"
import CreateButton from '@/components/create-button'
import ProjectForm from '@/components/project-form'
import { LucideAArrowDown, LucideCross, LucideEyeClosed, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'


function CreateNav(){
  const Pathname = usePathname()
  const title = Pathname.split('/')[2]?.replace(/^\w/, (c) => c.toUpperCase()) || '';
  const backPath = Pathname.split('/').slice(0, -1).join('/')
  
  return(
    <nav className='flex justify-between items-center h-12 border-b w-full' >
      <CreateButton link={backPath} className=' rounded-none h-12 px-5 bg-white shadow-none text-gray-600 border'><X/></CreateButton>
      <h1 className='text-[24px] font-semibold '>Create {title}</h1>
      <CreateButton link={backPath} className='rounded-none h-12 px-8 capitalize'>Create{title}</CreateButton>
    </nav>
  )
}

function page() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-white" >
      <CreateNav/>
      <div className="flex flex-col gap-8 pb-10 bg-white  ">
        <h1 className="text-4xl font-semibold ">Who's your Client?</h1>
        <ProjectForm/>
      </div>
    </div>
  )
}

export default page

