import CreateButton from "@/components/create-button";
import DataTable from "@/components/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { Plus } from "lucide-react";
import React from "react";


async function page() {
  const session = await auth();
  // console.log(session);
  const userId = Number(session?.user?.id);
  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex flex-row-reverse items-center justify-between">
        <CreateButton className="" link="/app/clients/create">
          Create new <Plus />
        </CreateButton>
        <p className="text-muted-foreground">
          {clients.length > 0 ?
            <span>Total {clients.length} clients</span>
            : "No clients"}
        </p>

      </div>
      <DataTable />
    </div>
  );
}

export default page;
