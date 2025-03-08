import MainNavbar from '@/components/main-navbar'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='flex'>

            <section className='py-8 px-4 space-y-2 mt-10 w-48'>

                <Skeleton className="w-full h-[25px] rounded-full " />
                <Skeleton className="w-full h-[25px] rounded-full " />
                <Skeleton className="w-full h-[25px] rounded-full " />
                <Skeleton className="w-full h-[25px] rounded-full " />
                <Skeleton className="w-full h-[25px] rounded-full " />
                <Skeleton className="w-full h-[25px] rounded-full " />
            </section>
            <section className='container pt-20 space-y-2'  >
                <div className='flex gap-2  w-full'>
                    <Skeleton className="min-w-[400px] h-[40px] rounded-full " />
                    <Skeleton className="min-w-[400px] h-[40px] rounded-full " />
                </div>
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
                <Skeleton className="min-w-[400px] w-full h-[40px] rounded-full " />
            </section>
        </div>
    )
}

export default loading