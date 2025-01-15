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
import CreateButton from "./create-button";
import { Edit, Plus } from "lucide-react";
import Deletebtn from "./delete-btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

async function TranscationTable() {
  const session = await auth();
  const transaction = await prisma.transaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    include: {
      Client: true,
      Project: true,
    },
  });
  return (
    <div className="p-2 shadow-sm border min-h-60">
      {transaction.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Company Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="">Project Name</TableHead>
              <TableHead className=""> Contact Name</TableHead>
              <TableHead>Amount</TableHead>
              {/* <TableHead className="">Note</TableHead> */}
              <TableHead className="">Type</TableHead>
              <TableHead className="">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.map((transaction) => (
              <TableRow key={transaction.id} className="group">
                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction?.Client?.companyName}
                </TableCell>
                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction.title}
                </TableCell>

                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction?.Project?.name}
                </TableCell>
                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction?.Client?.contactName}
                </TableCell>

                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction.amount}
                </TableCell>
                {/* <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction.description}
                </TableCell> */}
                <TableCell className="group-hover:font-medium transition-all duration-150">
                  <Badge variant={"secondary"}>{transaction.type}</Badge>
                </TableCell>

                <TableCell className="group-hover:font-medium transition-all duration-150">
                  {transaction.date.toDateString()}
                </TableCell>
                <TableCell className="flex gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl">
                      ...
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <p>Edit</p>
                        <Link
                          href={`/app/transactions/create?query=${transaction.id}`}
                          className=""
                        >
                          <Edit size={18} />
                        </Link>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="">
                        <p>Delete</p>
                        <Deletebtn id={transaction.id} action="transaction" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className=" flex  flex-col  items-center justify-center p-14">
          <h2 className="text-xl font-semibold text-gray-800">
            No Transaction found
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            It looks like you haven’t made any transactions yet. Start by
            recording your first transaction now!
          </p>
          <CreateButton className="" link="/app/transactions/create">
            Create new <Plus />
          </CreateButton>
        </div>
      )}
    </div>
  );
}

export default TranscationTable;
