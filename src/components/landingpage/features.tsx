import React from "react";
import { Card } from "@/components/ui/card";
import { BsSpeedometer } from "react-icons/bs";
import { AiTwotoneProject } from "react-icons/ai";
import { TiHome } from "react-icons/ti";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { GoProject } from "react-icons/go";

const featuresData = [
  {
    title: "Clients Management",
    description: "Manage your clients and their projects with ease.",
    logo: <FaArrowsDownToPeople  size={38} />,
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
      <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Features
      </h2>
      <p className="text-center mt-2 mb-5 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Taxonomy also includes a blog and a full-featured documentation site
        built.
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {featuresData.map((feature) => (
          <Card
            className="p-7 py-8 w-96 md:w-80 bg-white text-black border-none"
            key={feature.title}
          >
            <div className={"text-primary"}>{feature.logo}</div>
            <h3 className="text-xl mt-3 mb-1 font-medium">{feature.title}</h3>
            <p className="text-xs">{feature.description}</p>
          </Card>
        ))}
      </section>
    </section>
  );
};

export default Features1;
