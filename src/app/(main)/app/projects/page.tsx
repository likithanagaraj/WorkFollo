import CreateButton from "@/components/create-button";
import ProjectDataTable from "@/components/project-table";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import React from "react";

async function page() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <CreateButton className="" link="/app/projects/create">
        Create new <Plus />
      </CreateButton>


      <ProjectDataTable />
    </div>
  );
}

export default page;
