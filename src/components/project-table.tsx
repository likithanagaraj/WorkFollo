import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import React from "react";

async function ProjectDataTable() {
  const projects = await prisma.project.findMany({
    include: {
      Client: true // This will include the full client information
    }
  });

  return (
    <div className="bg-white p-2 shadow-sm border min-h-60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Starts</TableHead>
            <TableHead className="">Ends</TableHead>
            <TableHead className="">Contract</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="font-medium">{project.Client.companyName}</TableCell>
              <TableCell className="font-medium">{project.startDate.toDateString()}</TableCell>
              <TableCell className="font-medium">{project.endDate?.toDateString()}</TableCell>
              <TableCell className="font-medium">{project.contract}</TableCell>
              <TableCell className="font-medium">{project.status}</TableCell>
              <TableCell className="font-medium">{project.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectDataTable;