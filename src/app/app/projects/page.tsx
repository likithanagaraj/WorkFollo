
import CreateButton from "@/components/create-button";
import ProjectDataTable from "@/components/project-table";
import React from "react";



function page() {
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
      <CreateButton className="rounded-none p-5" link="/app/projects/create">
        New Projects
      </CreateButton>
  
  {/* <DataTableTab tabs={tabs} /> */}
      <ProjectDataTable/>
    </div>
  );
}

export default page;
