import SignInForm from "@/components/signin-form";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {/* <Link href={"/"} className="flex items-center left-0">
        <MoveLeft /> Home
      </Link> */}
      <SignInForm className="" />
    </div>
  );
};

export default page;
