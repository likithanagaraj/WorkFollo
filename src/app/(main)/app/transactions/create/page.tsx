import TranscationForm from "@/components/transaction-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CreateClientPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  const id = searchParams.query;
  return (
    <div
      className="flex flex-col justify-center items-start 
     px-14 py-8 gap-6"
    >
      <Link
        href={"/app/transactions"}
        className="flex gap-1 items-center text-primary/60"
      >
        <ArrowLeft size={14} />
        Back
      </Link>
      <TranscationForm id={id} />
    </div>
  );
}
