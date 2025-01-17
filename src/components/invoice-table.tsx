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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronRight, Edit, Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Deletebtn from "./delete-btn";
import CreateButton from "./create-button";
async function InvoiceDataTable() {
  const invoice = await prisma.invoice.findMany();
  return (
    <div className=" p-2 shadow-sm border min-h-60">
      {
        invoice.length > 0 ? (
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
              <TableRow className="group" key={invoice.id}>
                <TableCell>
                  <Link href={`/app/invoice/${invoice.invoiceNumber}`}>
                  {invoice.invoiceNumber}
                    <ChevronRight
                      size={16}
                      className="hidden group-hover:inline group-hover:translate-x-2 translate-x-0 group-hover:duration-500 group-hover:delay-200 group-hover:transition-all ease-in"
                    />
                    
                  </Link>
                </TableCell>
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
        ):
        <div className=" flex  flex-col  items-center justify-center p-14">
          <h2 className="text-xl font-semibold text-gray-800">
            No Invoice found
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            It looks like you haven’t added any invoice yet. Start by adding
            your first invoice now!
          </p>
          <CreateButton className="" link="/app/invoice/create">
            Create new <Plus />
          </CreateButton>
        </div>
      }
    </div>
  );
}

export default InvoiceDataTable;
