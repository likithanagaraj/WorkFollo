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

async function ProjectDataTable() {
  const session = await auth();
  // console.log(session);
  const userId = Number(session?.user?.id);
  const projects = await prisma.project.findMany({
    where: { userId },
    include: { Client: true, services: true, billings: true },
  });

  return (
    <div className=" p-2 shadow-sm border min-h-60">
      {projects.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Project</TableHead>

              <TableHead>Client</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              {/* <TableHead>Starts</TableHead>
              <TableHead className="">Ends</TableHead> */}
              {/* <TableHead className="">Contract</TableHead> */}
              <TableHead className="">Status</TableHead>
              {/* <TableHead className="">Amount</TableHead> */}
              {/* <TableHead className="">Description</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link href={`/app/projects/${project.id}`}>
                    {project.name}
                  </Link>
                </TableCell>

                <TableCell className="font-medium">
                  {project.Client.contactName}
                </TableCell>
                <TableCell className="font-medium">
                  {project.Client.companyName}
                </TableCell>
                <TableCell className="font-medium">
                  {project.Client.contactEmail}
                </TableCell>
                {/* <TableCell className="font-medium">{project.startDate.toDateString()}</TableCell>
                <TableCell className="font-medium">{project.endDate?.toDateString()}</TableCell> */}
                {/* <TableCell className="font-medium">{project.contract}</TableCell> */}
                <TableCell className="font-medium">{project.status}</TableCell>
                <TableCell className="font-medium"></TableCell>
                <TableCell className="flex gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl">
                      ...
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                      <p>Edit</p>
                        <Link
                          href={`/app/projects/create?query=${project.id}`}
                          className=""
                        >
                          <Edit size={18} />
                        </Link>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="">
                        <p>Delete</p>
                        <Deletebtn id={project.id} action="project" />
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
            No Project found
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            It looks like you haven’t added any projects yet. Start by adding
            your first project now!
          </p>
          <CreateButton className="" link="/app/projects/create">
            Create new <Plus />
          </CreateButton>
        </div>
      )}
    </div>
  );
}

export default ProjectDataTable;

{
  /* <div className=" flex  flex-col  items-center justify-center p-14">
          <h2 className="text-xl font-semibold text-gray-800">
            No clients found
          </h2>
          <p className="text-gray-500 mb-4 text-sm" >
            It looks like you haven’t added any clients yet. Start by adding
            your first client now!
          </p>
          <CreateButton className="" link="/app/clients/create">
            Create new <Plus />
          </CreateButton>
        </div> */
}
