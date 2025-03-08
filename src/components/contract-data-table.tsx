import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronRight, Edit, Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Deletebtn from "./delete-btn";
import CreateButton from "./create-button";
import { auth } from "@/lib/auth";
async function ContractDataTable() {
  const session = await auth();
  const contract = await prisma.contract.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    include: {
      Client: true, // This will include the full client information
    },
  });
  return (
    <div className=" p-2 shadow-sm border min-h-60">
      {
        contract.length > 0 ? (
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Contract Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Contact Number</TableHead>
            {/* <TableHead className="">Status</TableHead>
            <TableHead className="">Date</TableHead> */}
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contract.map((contract) => {
            return (
              <TableRow className="group" key={contract.id}>

                <TableCell>
                <Link href={`/app/contract/create?query=${contract.id}`}>
                {contract.contractName}
                    <ChevronRight
                      size={16}
                      className="hidden group-hover:inline group-hover:translate-x-2 translate-x-0 group-hover:duration-500 group-hover:delay-200 group-hover:transition-all ease-in"
                    />
                    
                  </Link>
                </TableCell>
                <TableCell>{contract.Client.contactName}</TableCell>
                <TableCell>{contract.Client.contactPhone}</TableCell>
                {/* <TableCell>{contract.Client.status}</TableCell>
                <TableCell>{contract.Client.address}</TableCell> */}
                <TableCell className="flex gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xl">
                      ...
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/app/contract/create?query=${contract.id}`}
                          className="flex items-center justify-between gap-6"
                        >
                          <span>Edit</span>
                          <Edit  size={16} />
                        </Link>
                      </DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem className="flex items-center text-destructive justify-between">
                        {/* Delete */}
                        <Deletebtn id={contract.id} action="contract" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
        ):(
          <div className=" flex  flex-col  items-center justify-center p-14">
          <h2 className="text-xl font-semibold text-gray-800">
            No Contract found
          </h2>
          <p className="text-gray-500 mb-4 text-sm">
            It looks like you haven’t added any Contract yet. Start by adding
            your first Contract now!
          </p>
          <CreateButton className="" link="/app/contract/create">
            Create new <Plus />
          </CreateButton>
        </div>
        )
      }
    </div>
  );
}

export default ContractDataTable;
