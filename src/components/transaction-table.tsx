import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

async function TranscationTable() {
  const session = await auth();
  const transaction = await prisma.transaction.findMany({
    include: {
      Client: true,
      Project: true,
    },
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return (
    <div className="p-2 shadow-sm border min-h-60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Company Name</TableHead>
            <TableHead className="">Project Name</TableHead>
            <TableHead className=""> Contact Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="">Note</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transaction.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {""}
                <Link href={`/app/clients/${transaction?.Client?.id}`}>
                  {" "}
                  {transaction?.Client?.companyName}
                </Link>
              </TableCell>

              <TableCell className="font-medium">
                <Link
                  href={`/app/clients/${transaction.Client?.id}/transactions`}
                >
                  {transaction?.Project?.name}
                </Link>
              </TableCell>
              <TableCell className="font-medium">
                {transaction?.Client?.contactName}
              </TableCell>
              <TableCell className="font-medium">{transaction.title}</TableCell>
              <TableCell className="font-medium">
                {transaction.amount}
              </TableCell>
              <TableCell className="font-medium">
                {transaction.description}
              </TableCell>
              <TableCell className="font-medium">{transaction.type}</TableCell>

              <TableCell className="font-medium">
                {transaction.date.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TranscationTable;
