import { PieChartGraph } from "@/components/pi-chart";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { Progress } from "@/components/ui/progress";

import Link from "next/link";
import React from "react";
import CreateButton from "@/components/create-button";
import { Button } from "react-day-picker";
type Params = Promise<{ client: string }>;
const page = async ({ params }: { params: Params }) => {
  const { client } = await params;

  const clients = await prisma.client.findMany({
    where: {
      id: Number(client),
    },
    include: {
      projects: true,
    },
  });

  return (
    <>
      {clients.map((client) => {
        return (
          <main
            key={client.id}
            className="p-10 relative flex flex-col gap-[55px]"
          >
            <h1 className="text-4xl font-bold ">{client.companyName}</h1>
            <Link href={`/app/clients/${client.id}/transactions`}>
              <h2 className="text-2xl  hover:underline ">Transaction</h2>
            </Link>
            <div className="absolute right-[110px] top-[20px]">
              {" "}
              <PieChartGraph />
            </div>
            <div className="flex gap-8 ">
              <h2 className="text-2xl  ">Projects</h2>
              <CreateButton
                link={`/app/projects/create`}
                className="font-semibold rounded-none"
              >
                CREATE PROJECTS
              </CreateButton>
            </div>

            <div className="flex flex-row gap-10 ">
              {client.projects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className=" flex flex-col gap-5 border px-5 py-8 shadow-sm  "
                  >
                    <div className="flex gap-10 items-center justify-between">
                      <h1 className="text-[22px] font-semibold">
                        {project.name}
                      </h1>

                      <Badge className=" h-5 max-w-52">OnProgress</Badge>
                    </div>
                    <Progress className=" border h-3" value={40} />
                  </div>
                );
              })}
            </div>
          </main>
        );
      })}
    </>
  );
};

export default page;
