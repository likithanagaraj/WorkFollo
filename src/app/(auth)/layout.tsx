import React, { ReactNode } from "react";
import AvatarList from "@/components/avatars-list";
import Logo from "@/components/logo";
import { auth } from "@/lib/auth";
import { ArrowLeft, MoveLeft, Quote } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user) redirect("/app");
  return (
    <div className="flex   min-h-screen ">
      <div className="h-full flex flex-col items-center justify-center w-full">
        <Link
          href={"/"}
          className="flex items-center absolute top-10 left-10 text-sm gap-2"
        >
          <ArrowLeft size={16} /> Home
        </Link>
        {children}
      </div>
      <div className="hidden lg:flex min-h-screen items-center bg-primary/5  justify-center w-[50dvw] p-6 sticky">
        <div>
          <Logo full className="flex-row" width={60} />

          <Image
            src={"https://illustrations.popsy.co/gray/home-office.svg"}
            height={500}
            width={300}
            alt="abs img aspect-video"
            className=""
          />
          <Quote className="rotate-180 fill-black opacity-70" />
          <p className="text-balance font-medium">
            I gave @workspace a try today and I was positively impressed! Very
            quick setup to get a working with management automatically for you
            👌 10/10 will play more
          </p>
          <AvatarList className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default layout;
