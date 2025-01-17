import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Navbar1 from "@/components/marketing/navbar";
import Features1 from "@/components/marketing/features";
import Cta2 from "@/components/marketing/cta";
import BasicFooter from "@/components/marketing/footer";
import { Metadata } from "next";
import { ArrowRightIcon, BadgeCheckIcon, Zap } from "lucide-react";
import BusinessHero from "@/components/business-hero";
import HowItWorks from "@/components/how-it-works";
import AvatarList from "@/components/avatars-list";
import { Shapes } from "@/components/shapes";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Work Follo",
  description: "Simplify Freelancing & Agency Work with Our All-in-One Tool",
  keywords: "freelance, agency, management, tool,work",
};

const HeroSection1 = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const ref = searchParams.ref;

  if (ref) {
    console.log(ref);
    // sendRefToServer(ref)
  }

  const salesCopies = [
    "Simplify Freelancing & Agency Work with Our All-in-One Tool",
    "Get back to business with effortless management",
    "Save time and money with a cost-effective management platform with easy usage.",
    "Gone are days of manual invoicing, tracking, and managing clients.",
  ];

  return (
    <main className=" textd-black bg-[#f8f8f8] ">
      {/* <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}

      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      <section className="h-screen">
        <Navbar1 />
        <section className="z-0  px-5 md:py-16 p-5 pb-30 sm:flex sm:flex-col items-center">
          {/* <Badge>🎉 We are launching soon!!!</Badge> */}
          <AvatarList className="z-0 " />

          <h1 className="z-10 md:z-10 text-foreground text-[44px] font-calsans mt-2 sm:text-6xl sm:w-2/3 sm:text-center">
            Gone are days of <span className=" underline">manual</span>{" "}
            invoicing, tracking, and managing clients.
            {/* {salesCopies[3]} */}
            {/* Simplify Freelancing & Agency Work with Our{" "}
            <span className="text-primary font-serif">All-in-One Tool</span> */}
            {/* <span className="text-primary "> effortlessly</span> */}
          </h1>
          <p className="z-0  sm:text-[18px] opacity-85 font-light mb-6 mt-5 md:max-w-[600px] md:text-center font-calsans">
            We’ve built a tool specifically for freelancers and agencies to
            manage the unexciting yet essential tasks that come with your
            business—so you can focus on what you do best.
          </p>
          <section className="z-0 flex gap-4 ">
            <div className="flex items-center gap-1">
              <BadgeCheckIcon
                size={20}
                className="bg-primary rounded-full text-white"
              />
              Project Management
            </div>
            <div className="flex items-center gap-1">
              <BadgeCheckIcon
                size={20}
                className="bg-primary rounded-full text-white"
              />
              Clients Management
            </div>

            {/* <div className="flex items-center gap-1">
              <BadgeCheckIcon className="bg-primary rounded-full text-white" />
              Transaction Management
              </div> */}
          </section>
          <div className="z-0 flex items-center mt-10">
            <Link href="/app">
              <Button
                className="text-white capitalize z-10 text-md hover:shadow-2x"
                variant={"default"}
                size={"lg"}
              >
                Take me to the solution <Zap size={16} />
              </Button>
            </Link>
          </div>
        </section>
        <section className=" p-5 relative flex justify-center items-center ">
          <div className="size-96 fade-in-45 transition-all duration-300 -top-20 -z-0 opacity-60 md:size-[500px] absolute blur-3xl rounded-full bg-primary" />
          <Image
            src={"/assets/dashboard_half.png"}
            height={1000}
            width={900}
            alt="abs img aspect-video"
            className=" md:block z-0 rounded-lg shadow-2xl"
          />
          <Image
            src={"https://illustrations.popsy.co/gray/product-launch.svg"}
            height={500}
            width={300}
            alt="abs img "
            className="absolute size-40 md:size-96 right-0 -top-10 md:right-20 md:-top-10"
          />
        </section>
      </section>
      <Features1 />
      <section className="flex flex-col items-center justify-center w-full">
        <div className="space-y-2">
          <Shapes.Quote className="fill-muted-foreground" />
          <p className="text-lg font-light">
            I was able to add 1+ more client in just a week by using
            WorkFollo.
          </p>
        </div>
      </section>
      <BusinessHero />
      <HowItWorks />
      <Cta2 />
      <BasicFooter />
    </main>
  );
};

export default HeroSection1;
