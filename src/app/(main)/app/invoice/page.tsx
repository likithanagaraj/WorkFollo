import ContractDataTable from "@/components/contract-data-table";
import CreateButton from "@/components/create-button";
import InvoiceDataTable from "@/components/invoice-table";
import TranscationTable from "@/components/transaction-table";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import React from "react";

async function page() {
 
  return (
    <div className="p-8 flex flex-col gap-4">
      <CreateButton link="/app/invoice/create">
        New Invoice <Plus />
      </CreateButton>

      <InvoiceDataTable />
    </div>
  );
}

export default page;
