import CreateButton from "@/components/create-button";
import DataTableTab from "@/components/data-table-tab";
import prisma from "@/lib/db";
import React from "react";

const tabs = [
  { label: "Name", content: "There are no client yet." },
  { label: "City", content: "There are no projects yet." },
  { label: "Last email sent", content: "There are no projects yet." },
  { label: "Total projects", content: "There are no projects yet." },
  { label: "Income recevied", content: "There are no projects yet." },
];

async function page() {
  const clients = await prisma.client.findMany();
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
      <CreateButton className="rounded-none p-5" link="/app/clients/create">
        New Clients
      </CreateButton>

      {clients.length > 0 && clients.map((client) => <div>1</div>)}
      {/* <DataTableTab tabs={tabs}   /> */}
    </div>
  );
}

export default page;
