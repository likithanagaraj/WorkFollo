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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Client, Project } from "@prisma/client";
import { ArrowRight, ChartLine, Edit, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import Deletebtn from "@/components/delete-btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

type Params = Promise<{ id: string }>;

async function page({ params }: { params: Params }) {
  const session = await auth();
  const { id } = await params;
  // const client = await prisma.client.findMany({
  //   where:{
  //     id:Number(id)
  //   }
  // })

  const projects = await prisma.project.findMany({
    where: {
      id: Number(id),
      userId: Number(session?.user?.id),
    },
    include: {
      Client: true,
      Transaction: true,
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
                  {project.Transaction.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.title}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                      ₹
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
                              <Link
                                href={`/app/transactions/create?query=${transaction.id}`}
                                className="flex items-center justify-between gap-6"
                                >
                                <p>Edit</p>
                                <Edit size={15} />
                              </Link>
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="">
                              {/* <p>Delete</p> */}
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
            </section>
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
