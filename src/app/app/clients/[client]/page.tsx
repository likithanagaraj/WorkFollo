
import prisma from '@/lib/db';
import Link from 'next/link';
import React from 'react'
type Params = Promise<{ client: string }>
const page =async ({ params }:{params:Params}) => {
  const {client} =await params

  const clients = await prisma.client.findMany({
    where: {
      id: Number(client),
    },
  });
 
  

  return (
    <div className=''>
      {clients.map((client) => {
        return (
          <div key={client.id} className='p-8'>
            <h1 className='text-2xl mb-3'> {client.companyName}</h1>
            <p >{client.contactName}</p>
            <Link href={`/app/client/${client.id}/transaction`}>Transaction</Link>

            {/* <p>{client.contactEmail}</p>
            <p>{client.contactPhone}</p>
            <p>{client.description}</p> */}
          </div>
        )
      })
      
      }

    </div>
  )
}

export default page