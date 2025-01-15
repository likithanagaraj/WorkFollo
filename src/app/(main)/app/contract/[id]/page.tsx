import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
interface PageProps {
  params: {
    id: string;
  };
}
async function page({ params }: PageProps) {
  const session = await auth();
    
    if (!session) {
      return redirect("/login");
    }
    const invoiceData = await prisma.contract.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
       Client: true
      }
    });
  
    if (!invoiceData) {
      notFound();
    }
  
  return (
    <div className="container mx-auto px-14 py-8 space-y-6">
      <Link
        href="/app/contract"
        className="flex gap-1 text-sm items-center text-primary/60 hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} />
        <p>Back</p>
      </Link>
     
    </div>
  )
}

export default page