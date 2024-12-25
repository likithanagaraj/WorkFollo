import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar1 from "./navbar";
import Features1 from "./features";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import BasicFooter from "./footer";
import Cta2 from "./cta";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HeroSection1 = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const ref = searchParams.ref;

  if (ref) {
    console.log(ref);
    // sendRefToServer(ref)
  }

  
  return (
    <main className=" text-black">
      <section className="min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <Navbar1 />
        <section className="px-5 md:py-16 p-5 pb-30 sm:flex sm:flex-col items-center">
          <Badge>🎉 Something special is waiting!</Badge>
          <h1 className="text-5xl mt-2 sm:text-6xl sm:w-2/3 sm:text-center">
            Simplify Freelancing & Agency Work with Our{" "}
            <span className="text-primary ">All-in-One Tool</span>
            {/* <span className="text-primary "> effortlessly</span> */}
          </h1>
          <p className=" sm:text-[18px] opacity-75 font-light mb-6 mt-5 md:max-w-[600px] md:text-center">
            We’ve built a tool specifically for freelancers and agencies to
            manage the unexciting yet essential tasks that come with your
            business—so you can focus on what you do best.
          </p>
          <div className="flex items-center mt-10">
            <Input placeholder="Enter your email" />

            <Button className="font-semibold   text-lg" variant={"default"}>
              Join waitlist
            </Button>
          </div>
        </section>
        <section className="p-5  flex justify-center items-center ">
          <Image
            src={"/dashboard.png"}
            height={1000}
            width={900}
            alt="abs img aspect-video"
            className=" md:block rounded-lg shadow-2xl"
          />{" "}
        </section>
      </section>
      <Features1 />
      <Cta2 />
      <BasicFooter />
    </main>
  );
};

export default HeroSection1;
