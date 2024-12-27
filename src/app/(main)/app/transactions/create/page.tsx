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
     p-8"
    >
      <Link
        href={"/app/transactions"}
        className="flex gap-2 items-center text-primary/60"
      >
        <ArrowLeft size={16} />
        Back
      </Link>
      <TranscationForm id={id} />
    </div>
  );
}
