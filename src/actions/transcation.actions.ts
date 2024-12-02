"use server"
import prisma from "@/lib/db"
import { addTransactionformSchema } from "@/types"
import { z } from "zod"

export const createTransaction = async (values: z.infer<typeof addTransactionformSchema>) => {
  try {
    console.log("Transcation creating...")
    const client = await prisma.transaction.create({
      data:{
        amount: 0,
        description: values.description,
        type: values.type,
        date: values.date,
        title: values.title,
        category: values.category,
        userId: 1,
        clientId: values.Client,
        projectId: values.Project,
        // Project: { connect: { id: values.Project } },
        // Client : {connect:{id : values.Client}}
      },
    })
    console.log("Transcation created", client)

    return { success: true }
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error }
  }
}

export async function fetchProject() {
  try {
    // Fetch clients from Prisma
    const project = await prisma.project.findMany({
      select: {
        id: true,
        name:true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return project;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
}
export async function fetchProjectBasedonClient(id:number) {
  try {
    // Fetch clients from Prisma
    const projectClientLink = await prisma.project.findMany(
      {
        where: {
          clientId: id
        },
        select: {
          id: true,
          name:true
        },
        orderBy: {
          name: 'asc'
        }
      }
    );
console.log(projectClientLink)  
    return projectClientLink;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
}
