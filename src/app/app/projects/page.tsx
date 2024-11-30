
import CreateButton from "@/components/create-button";
import DataTableTab from "@/components/data-table-tab";
import React from "react";

const tabs = [
  { label: "Project", content: "There are no projects yet." },
  { label: "Client", content: "There are no projects yet." },
  { label: "Starts", content: "There are no projects yet." },
  { label: "Ends", content: "There are no projects yet." },
  { label: "Status", content: "There are no projects yet." },
  { label: "Amount Invoice", content: "There are no projects yet." },
]


function page() {
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
      <CreateButton className="rounded-none p-5" link="/app/projects/create">
        New Projects
      </CreateButton>
  <DataTableTab tabs={tabs} />
      
    </div>
  );
}

export default page;
