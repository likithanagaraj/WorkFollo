import CreateButton from "@/components/create-button";
import TranscationTable from "@/components/transaction-table";
import React from "react";


async function page() {
  
  return (
    <div className="px-10 py-20 flex flex-col gap-8">
      <CreateButton className="rounded-none p-5" link="/app/transactions/create">
        New Transcation
      </CreateButton>

      {/* {clients.length > 0 && clients.map((client) => <div>1</div>)} */}
      <TranscationTable/>
    </div>
  );
}

export default page;
