import { PieChartGraph } from "@/components/pi-chart";
import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Deletebtn from "@/components/delete-btn";
type Params = Promise<{ client: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const client = params.client;

  const data = await prisma.client.findMany({
    where: {
      id: Number(client),
    },
    include: {
      Transaction: true,
      projects: true,
    },
  });
  return (
    <div className="px-10 py-10 relative">
      <div>
        {data.map((client) => {
          return (
            <div key={client.id} className=" flex flex-col">
              <section className="flex justify-between">
                <div className="">
                  <h2 className="text-2xl font-semibold mb-3">
                    {client.companyName}
                  </h2>
                  <div className=" p-4 "></div>
                </div>
                <PieChartGraph data={client.Transaction} />
              </section>

              {/* Transactions Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Transactions</h2>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.Transaction.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.title}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          $
                          {transaction.amount
                            ? transaction.amount.toFixed(2)
                            : "0.00"}
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
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
                                <Deletebtn
                                  id={transaction.id}
                                  action="transaction"
                                />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
