import ContarctTemplate from "@/components/contract";
import Editor from "@/components/editor-novel";

import { TextButtons } from "@/components/editor/selectors/text-buttons";
import { auth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
async function page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const id = searchParams.query;
  const session = await auth();
  const userId = Number(session?.user?.id);

  return (
    <div className="container mx-auto px-8 ">
      <Link
        href="/app/contract"
        className="flex gap-2 text-lg items-center text-primary/60 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        <p>Back</p>
      </Link>
      <Editor userId={userId} editId={id} />
      {/* <ContarctTemplate/> */}
    </div>
  );
}

export default page;
