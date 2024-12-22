import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import prisma from "@/lib/db";
import React from "react";
import { LucideEllipsis } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Badge } from "./ui/badge";

async function DataTable() {
  const session = await auth();
  // console.log(session);
  const userId = Number(session?.user?.id);
  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className=" p-2 shadow-sm border min-h-60">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead className="">Contact Email</TableHead>
            <TableHead className="">Contact Phone</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        {clients.map((client) => (
          <TableBody key={client.id}>
            <TableRow>
              {/* <TableCell className="font-medium">{client.id}</TableCell> */}

              <TableCell>
                {" "}
                <Link href={`/app/clients/${client.id}`}>
                  {client.companyName}{" "}
                </Link>
              </TableCell>

              <TableCell>{client.contactName}</TableCell>
              <TableCell className="">{client.contactEmail}</TableCell>
              <TableCell className="">{client.contactPhone}</TableCell>
              <TableCell className="">
                <Badge variant={"secondary"}>Active</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}

export default DataTable;
