import CreateButton from "@/components/create-button";
import TranscationTable from "@/components/transaction-table";
import React from "react";

async function page() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <CreateButton link="/app/transactions/create">
        New Transcation
      </CreateButton>

      <TranscationTable />
    </div>
  );
}

export default page;
