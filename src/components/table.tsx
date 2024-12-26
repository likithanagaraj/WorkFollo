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
import {
  Delete,
  DeleteIcon,
  Dot,
  Edit,
  Ellipsis,
  LucideEllipsis,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import CreateButton from "./create-button";
import Deletebtn from "./delete-btn";
import SelectDemo from "./status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

async function DataTable() {
  const session = await auth();
  // console.log(session);
  const userId = Number(session?.user?.id);
  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className=" p-2 shadow-sm border min-h-60">
      {clients.length > 0 ? (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead className="">Contact Email</TableHead>
              <TableHead className="">Contact Phone</TableHead>
              {/* <TableHead className="">Status</TableHead> */}
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {clients.map((client) => (
            <TableBody key={client.id}>
              <TableRow>
                {/* <TableCell className="font-medium">{client.id}</TableCell> */}

                <TableCell>
                  <Link href={`/app/clients/${client.id}`}>
                    {client.companyName}
                  </Link>
                </TableCell>

                <TableCell>{client.contactName}</TableCell>
                <TableCell className="">{client.contactEmail}</TableCell>
                <TableCell className="">{client.contactPhone}</TableCell>
                <TableCell className="flex gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl">
                      ...
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                      <p>Edit</p>
                        <Link
                          href={`/app/clients/create?query=${client.id}`}
                          className=""
                        >
                          <Edit size={14} />
                        </Link>
                      </DropdownMenuItem>
                      <Separator/>
                      <DropdownMenuItem  className="">
                       
                        <Deletebtn id={client.id} action="client" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* <Button onClick={handleDelete}><Trash size={18}  /></Button>  */}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <div className=" flex  flex-col  items-center justify-center p-14">
          <h2 className="text-xl font-semibold text-gray-800">
            No clients found
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            It looks like you haven’t added any clients yet. Start by adding
            your first client now!
          </p>
          <CreateButton className="" link="/app/clients/create">
            Create new <Plus />
          </CreateButton>
        </div>
      )}
    </div>
  );
}

export default DataTable;

// <div className=" ">

//        <h2 className="text-xl font-semibold text-gray-800">
//          No clients found
//        </h2>
//        <p className="text-gray-600 mb-4">
//          It looks like you haven’t added any clients yet. Start by adding your first client now!
//        </p>
//        <CreateButton className="" link="/app/clients/create">
//        Create new <Plus />
//      </CreateButton>
//      </div>
