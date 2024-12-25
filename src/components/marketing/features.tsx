import React from "react";
import { Card } from "@/components/ui/card";
import { TiHome } from "react-icons/ti";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { GoProject } from "react-icons/go";

const featuresData = [
  {
    title: "Clients Management",
    description: "Manage your clients and their projects with ease.",
    logo: <FaArrowsDownToPeople size={38} />,
  },
  {
    title: "Project Management",
    description: "Manage your projects and their tasks with ease.",
    logo: <GoProject size={38} />,
  },
  {
    title: "Transaction Management",
    description: "Manage your transactions and their invoices with ease.",
    logo: <GrTransaction size={38} />,
  },
  {
    title: "Dashboard",
    description: "Get an overview of your projects and transactions.",
    logo: <TiHome size={38} />,
  },
  // {
  //   title: "Nextjs 13",
  //   description: "App dir, Routing, Layouts, Loading UI and API routes.",
  //   logo: <BsSpeedometer size={38} />,
  // },
  // {
  //   title: "Nextjs 13",
  //   description: "App dir, Routing, Layouts, Loading UI and API routes.",
  //   logo: <BsSpeedometer size={38} />,
  // },
];

const Features1 = () => {
  return (
    <section className="flex items-center flex-col my-16">
      <h1>Features</h1>
      <p className="text-center mt-2 mb-5 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Taxonomy also includes a blog and a full-featured documentation site
        built.
      </p>
      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      <section className="flex gap-6">
        {featuresData.map((feature) => (
          <Card
            className="flex flex-col gap-2 items-start  p-7 py-8 max-w-52  md:w-80 rounded-lg bg-white/10 border text-black border-none"
            key={feature.title}
          >
            <div className={"text-primary"}>{feature.logo}</div>
            <div>
              <h3  className="text-xl mt-2 mb-1">{feature.title}</h3>
              <p className="text-xs text-wrap">{feature.description}</p>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
};

export default Features1;
