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
      {/* <h1 className="text-4xl font-bold mb-5">Client Details</h1> */}

      <div className="absolute right-[50px] top-[20px] z-10">
        <PieChartGraph />
      </div>

      <div>
        {data.map((client) => (
          <div key={client.id} className="max-w-[700px] flex flex-col gap-20">
            {/* Projects Section */}
            <div>
              {/* <h2 className="text-2xl font-semibold mb-3">Projects</h2> */}
              {client.projects.map((project) => (
                <div key={project.id} className="">
                  <h3 className="text-3xl font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-600">
                     {project.description || ""}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    Start Date: {project.startDate.toDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    End Date: {project.endDate?.toDateString()}
                  </p> */}
                </div>
              ))}
            </div>

            {/* Transactions Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Transactions</h2>
              {client.Transaction.map((transaction) => (
                <div key={transaction.id} className="mb-5">
                  <Table className="bg-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        {/* <TableHead>Purpose</TableHead> */}
                       
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{transaction.title}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        {/* <TableCell>{transaction. || "N/A"}</TableCell> */}
                        
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.date.toDateString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
