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
import { ArrowRight, ChartLine, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
type Params = Promise<{ id: string }>;
async function page({ params }: { params: Params }) {
  const sesion = await auth();
  const { id } = await params;
  // const client = await prisma.client.findMany({
  //   where:{
  //     id:Number(id)
  //   }
  // })

  const projects = await prisma.project.findMany({
    where: {
      id: Number(id),
      userId: Number(sesion?.user?.id),
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
          <div key={project.id} className="p-8 gap-4 flex flex-col">
            <div className="">
              <h1 className="text-3xl  font-bold"> {project.name}</h1>
              <p className="max-w-2xl mb-3 text-muted-foreground">
                {project.description}
              </p>
              <Badge className="scale-95 w-fit">{project.status}</Badge>

              {/* <Link
                href={`/app/clients/${project.id}/transactions`}
                className="text-sm text-muted-foreground flex items-center mt-1 group hover:opacity-80 transition-all duration-200 ease-in"
              >
                <ChartLine className="mr-1" size={16} /> View Transactions of
                this project{" "}
                <ArrowRight
                  className="group-hover:translate-x-2 transition-all duration-200 ease-in"
                  size={16}
                />
              </Link> */}
            </div>
            <section>
              <h3>Transactions</h3>
              <p >Add transactions here... of this project</p>
              <p className="border-b mt-2">-</p>
              <p className="border-b mt-2">-</p>
              <p className="border-b mt-2">-</p>
            </section>
            <section className="flex gap-4">
              <p className="min-w-80 h-52 flex flex-col items-center  justify-center border">show some charts</p>
              <p className="min-w-80 h-52 flex flex-col items-center  justify-center border">show some charts</p>
            </section>
            {/* <CreateButton link={`/app/projects/create`}>
              Create New <Plus />
            </CreateButton> */}
            {/* 
            <div className="flex flex-row gap-10 ">
              TODO: I just don't understand why do we need a card and why should we make a custom component for showing this. 
              <ProjectCard data={project} />
            </div>
              */}
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ data }: { data: Project }) {
  return (
    <Card key={data.id} className="border rounded-lg w-80">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
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
