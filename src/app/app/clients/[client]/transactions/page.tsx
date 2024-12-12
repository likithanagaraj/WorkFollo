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
import { Transaction } from "@prisma/client";

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

  // Function to calculate the total amounts for each transaction type
  const calculateTypeAmounts = (transactions: Transaction[]) => {
   
    return {
      
      expenses: transactions
        .filter((t) => t.type === "Expenses")
        .reduce((sum, t) => sum + (t.amount ? Number(t.amount) : 0), 0),
      cac: transactions
        .filter((t) => t.type === "CAC")
        .reduce((sum, t) => sum + (t.amount ? Number(t.amount) : 0), 0),
      payments: transactions
        .filter((t) => t.type === "Payments")
        .reduce((sum, t) => sum + (t.amount ? Number(t.amount) : 0), 0),
    };
    
  };

  return (
    <div className="px-10 py-10 relative">
      <div>
        {data.map((client) => {
          const typeAmounts = calculateTypeAmounts(client.Transaction);

          return (
            <div key={client.id} className="max-w-[700px] flex flex-col gap-20">
              <h2 className="text-2xl font-semibold mb-3">
                {client.companyName}
              </h2>
              <div className="absolute right-[50px] top-[20px] z-10">
                <PieChartGraph
                  profit={typeAmounts.payments}
                  expense={typeAmounts.expenses}
                  cac={typeAmounts.cac}
                />
                {/* Type Amount Summary */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-3">
                  Transaction  Summary
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="font-semibold text-red-500">Expenses</p>
                    <p>${typeAmounts.expenses.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-500">CAC</p>
                    <p>${typeAmounts.cac.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-green-500">Payments</p>
                    <p>${typeAmounts.payments.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              </div>
              
              {/* Transactions Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Transactions</h2>
                <Table className="bg-white">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.Transaction.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.title}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          ${transaction.amount ? transaction.amount.toFixed(2) : "0.00"}
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
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
