import CreateButton from "@/components/create-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/db";
import { Client } from "@prisma/client";
import Link from "next/link";
import React from "react";
type Params = Promise<{ id: string }>;
async function page({ params }: { params: Params }) {
  const { id } = await params;
  // const client = await prisma.client.findMany({
  //   where:{
  //     id:Number(id)
  //   }
  // })

  const projects = await prisma.transaction.findMany({
    where: {
      id: Number(id),
    },
    include: {
      Client: true,
    },
  });

  return (
    <main>
      hey
    </main>
  );
}


export default page;
