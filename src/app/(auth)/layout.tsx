import React, { ReactNode } from "react";
import AvatarList from "@/components/avatars-list";
import Logo from "@/components/logo";
import { auth } from "@/lib/auth";
import { Quote } from "lucide-react";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user) redirect("/app");
  return (
    <div className="flex   min-h-screen ">
      <div className="h-full flex flex-col items-center justify-center w-full">
        <Logo full className="flex-row" width={60} />
        {children}
      </div>
      <div className="hidden lg:flex min-h-screen items-center bg-primary/35  justify-center w-[50dvw] p-6 sticky">
        <div>
          <Quote className="rotate-180 fill-black opacity-70" />
          <h3 className="text-balance font-medium">
            I gave @workspace a try today and I was positively impressed! Very
            quick setup to get a working with management automatically for you 👌 10/10 will play
            more
          </h3>
          <AvatarList className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default layout;
