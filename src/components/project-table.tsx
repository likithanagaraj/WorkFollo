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

async function ProjectDataTable() {
  const session = await auth();
  // console.log(session);
  const userId = Number(session?.user?.id);
  const projects = await prisma.project.findMany({
    include: {
      Client: true, // This will include the full client information
    },
    where: {
      userId,
    },
  });

  return (
    <div className=" p-2 shadow-sm border min-h-60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Starts</TableHead>
            <TableHead className="">Ends</TableHead> */}
            <TableHead className="">Contract</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link href={`/app/projects/${project.id}`}>{project.name}</Link>
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
              <TableCell className="font-medium">{project.contract}</TableCell>
              <TableCell className="font-medium">{project.status}</TableCell>
              <TableCell className="font-medium">
                {project.totalBudget}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectDataTable;
