
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";
import CreateButton from "@/components/create-button";
import { ArrowRight, Plus } from "lucide-react";
import { notFound } from "next/navigation";

type Params = Promise<{ client: string }>;

const page = async ({ params }: { params: Params }) => {
  const { client: clientId } = await params;
  if (!clientId || !Number(clientId)) notFound();

  const client = await prisma.client.findUnique({
    where: { id: Number(clientId) },
    include: { projects: true,Transaction:true },
  });

  if (!client) notFound();

  return (
    <main key={client.id} className="p-10 relative flex flex-col">
      <div className="flex justify-between  w-full">
        <div>
          <h1 className="text-3xl font-medium ">{client.companyName}</h1>
          <p className="text-muted-foreground">{client.description}</p>
          <Link
            href={`/app/clients/${client.id}/transactions`}
            className="text-primary flex items-center"
          >
            Transaction <ArrowRight className="" size={16} />
          </Link>
        </div>
        <PieChartGraph data={client.Transaction} />
      </div>
      <section>
        <div className="flex w-full justify-between">
          <h2 className="text-2xl ">Projects</h2>
          <CreateButton link={`/app/projects/create`} className="">
            New Project <Plus />
          </CreateButton>
        </div>

        <div className="flex  gap-4 flex-wrap">
          {client.projects.map((project) => {
            return <ProjectCard key={project.clientId} data={project} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default page;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@prisma/client";
import prisma from "@/lib/db";
import { PieChartGraph } from "@/components/pi-chart";

function ProjectCard({ data }: { data: Project }) {
  return (
    <Card key={data.id} className="border rounded-lg w-80">
      <CardHeader className="pb-2">
        <CardDescription>{data.status}</CardDescription>
        <CardTitle className="text-3xl">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </CardContent>
      <CardFooter>
        <Progress value={12} aria-label="12% increase" />
      </CardFooter>
    </Card>
  );
}
