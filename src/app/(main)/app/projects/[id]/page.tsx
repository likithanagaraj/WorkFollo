import CreateButton from "@/components/create-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Client, Project } from "@prisma/client";
import Link from "next/link";
import React from "react";
type Params = Promise<{ id: string }>;
async function page({ params }: { params: Params }) {
  const sesion = await auth() 
  const { id } = await params;
  // const client = await prisma.client.findMany({
  //   where:{
  //     id:Number(id)
  //   }
  // })

  const projects = await prisma.project.findMany({
    where: {
      id: Number(id),
      userId:Number(sesion?.user?.id)
    },
    include: {
      Client: true,
    },
  });

  return (
    <div className="">
      {/* <ProjectCard data={projects} /> */}
      {projects.map((project) => {
        return (
          <div key={project.id} className="p-8 gap-10 flex flex-col">
            <h1 className="text-3xl mb-3 font-bold"> {project.name}</h1>
            {/* <h1 className='text-[20px] mb-3'> {project.Client.contactName}</h1> */}
            <Link
              className="text-2xl hover:underline"
              href={`/app/clients/${project.id}/transactions`}
            >
              Transaction
            </Link>
            <CreateButton
              link={`/app/projects/create`}
              className="font-semibold rounded-none"
            >
              CREATE PROJECTS
            </CreateButton>
            <div className="flex flex-row gap-10 ">
              {/* {projects.map((project) => {
                return (
                  <div key={project.id} className=" flex flex-col gap-5 border px-5 py-8 shadow-sm  ">
                    <div className="flex gap-10 items-center justify-between">
                      <h1 className="text-[22px] font-semibold">
                        {project.name}
                      </h1>

                      <Badge className=" h-5 max-w-52">OnProgress</Badge>
                    </div>
                    <Progress className=" border h-3" value={40} />
                  </div>
                );
              })} */}
              <ProjectCard data={project} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ data }: { data:Project }) {
  return (
    <Card key={data.id} className="border rounded-lg w-80">
      <CardHeader className="pb-2">
         <Badge className=" w-24">{data.status}</Badge>
        <CardTitle className="text-3xl">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </CardContent>
      <CardFooter>
        {data.status === "Done" ? (
          <div className="w-full flex items-center gap-2">
          <Progress className="border" value={100} />
          100%
          </div>
        ) : data.status === "incomplete" ? (
          <div className="w-full flex items-center gap-2 ">
            <Progress className="border" value={0} />
            0%
          </div>
        ) : (
          <div className="w-full flex items-center gap-2 ">
                  <Progress className="border" value={50} />
                  50%
                  </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default page;
