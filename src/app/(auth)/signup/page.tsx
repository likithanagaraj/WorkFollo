import Logo from "@/components/logo";
import { Shapes } from "@/components/shapes";
import SignUpForm from "@/components/signup-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/app");
  return (
    <div className="">
      <SignUpForm  />
    </div>
  );
};

export default page;
