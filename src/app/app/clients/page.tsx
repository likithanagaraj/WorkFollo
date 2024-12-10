import CreateButton from "@/components/create-button";
import DataTable from "@/components/table";
import React from "react";


async function page({}) {
  
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
      <CreateButton className="rounded-none p-5" link="/app/clients/create">
        New Clients
      </CreateButton>
      
      
      <DataTable/>
    </div>
  );
}

export default page;
