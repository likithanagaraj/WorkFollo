import CreateButton from "@/components/create-button";
import DataTable from "@/components/table";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import React from "react";


async function page() {
  const session = await auth();
    // console.log(session);
    const userId = Number(session?.user?.id);
  return (
    <div className="p-8 flex flex-col gap-4">
      <CreateButton className="" link="/app/clients/create">
        Create new <Plus />
      </CreateButton>

      <DataTable />
    </div>
  );
}

export default page;
