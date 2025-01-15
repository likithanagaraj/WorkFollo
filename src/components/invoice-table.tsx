import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Edit } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Deletebtn from "./delete-btn";
async function InvoiceDataTable() {
  const invoice = await prisma.invoice.findMany();
  return (
    <div className=" p-2 shadow-sm border min-h-60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Invoice Number</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Client Compancy Name</TableHead>
            <TableHead className="">Client Address</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.map((invoice) => {
            return (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.toName}</TableCell>
                <TableCell>{invoice.toCompanyName}</TableCell>
                <TableCell>{invoice.toAddress}</TableCell>
                <TableCell>{invoice.date.toLocaleDateString()}</TableCell>
                
                <TableCell className="flex gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl">
                      ...
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/app/invoice/create?query=${invoice.id}`}
                          className="flex items-center justify-between"
                        >
                          <span>Edit</span>
                          <Edit className="ml-[52]" size={16} />
                        </Link>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="flex items-center text-destructive justify-between">
                        Delete
                        <Deletebtn id={invoice.id} action="invoice" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default InvoiceDataTable;
