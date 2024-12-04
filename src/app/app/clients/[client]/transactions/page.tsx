import { PieChartGraph } from "@/components/pi-chart";
import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
  const searchParams = await props.searchParams;
  const client = params.client;
  const query = searchParams.query;

  // const data = await prisma.transaction.findMany({
  //   where: {
  //     // id: Number(client),
  //     clientId: Number(client),
  //   },
  //   include:{
  //     Client:true,
  //     Project:true

  //   }
  // });
  const data = await prisma.client.findMany({
    where: {
      // id: Number(client),
      id: Number(client),
    },
    include: {
      Transaction: true,
      projects: true,
    },
  });

  return (
    <div className="px-10 py-10 relative ">
      <h1 className="text-4xl font-bold mb-5">Transcations</h1>

      <div className="absolute right-[50px] top-[20px] z-10">
        <PieChartGraph />
      </div>
      <div>
        {data.map((e) => {
          return (
            <div key={e.id} className="max-w-[700px]   flex flex-col gap-20 ">
              {e.projects.map((project) => {
                return (
                  <div key={project.id} className="flex flex-col gap-5 ">
                    <h1 className="text-[27px] font-medium ">{project.name}</h1>
                    <div>
                      <Table className=" bg-white">
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                          <TableRow className="">
                            <TableHead className=""> Project Name</TableHead>
                            <TableHead className="">Description</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">Total Budget</TableHead>
                            <TableHead className="">Contract</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="">{project.name}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                              {project.startDate.toDateString()}
                            </TableCell>
                            <TableCell className="">
                              {project.endDate?.toDateString()}
                            </TableCell>
                            <TableCell className="">{project.status}</TableCell>
                            <TableCell className="">
                              {project.totalBudget}
                            </TableCell>
                            <TableCell className="">
                              {project.contract}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
