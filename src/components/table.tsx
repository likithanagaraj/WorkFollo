import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import React from "react";

async function DataTable() {
  const clients = await prisma.client.findMany();
  return (
    <div className="bg-white p-2 shadow-sm border min-h-60">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">Id</TableHead> */}
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead className="">Contact Email</TableHead>
            <TableHead className="">Contact Phone</TableHead>
            <TableHead className="">Description</TableHead>
          </TableRow>
        </TableHeader>
       {
        clients.map((client)=>(
          <TableBody key={client.id}>
          <TableRow>
            {/* <TableCell className="font-medium">{client.id}</TableCell> */}
            <TableCell>{client.companyName}</TableCell>
            <TableCell>{client.contactName}</TableCell>
            <TableCell className="">{client.contactEmail}</TableCell>
            <TableCell className="">{client.contactPhone}</TableCell>
            <TableCell className="">{client.description}</TableCell>
          </TableRow>
        </TableBody>
        ))
       }
      </Table>
    </div>
  );
}

export default DataTable;
