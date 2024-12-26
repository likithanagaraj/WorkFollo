"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addTransactionformSchema } from "@/types";
import { z } from "zod";



export async function fetchProject() {
  try {
    // Fetch clients from Prisma
    const project = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
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
    const projectClientLink = await prisma.project.findMany({
      where: {
        clientId: Number(id),
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    // console.log("IDK",projectClientLink);
    return projectClientLink;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
}


export async function getTranscation(id:string) {
  const transcation = await prisma.transaction.findUnique({
    where:{
      id:parseInt(id)
    },
    include:{
      Client:true,
      Project:true,
    },
    
  });

  
  if (!transcation) throw new Error("Transaction not found");
  return transcation;


}

export const createTransaction = async (values: z.infer<typeof addTransactionformSchema>) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const client = await prisma.transaction.create({
      data: {
        ...values,
        amount: parseFloat(values.amount), // Convert string to float
        userId: Number(session.user.id),
        description: values.description || null,
        projectId: values.projectId || null,
        clientId: values.clientId || null,
      },
    });

    return { success: true, data: client };
  } catch (error) {
    console.error("Transaction creation error:", error);
    throw error;
  }
};



interface UpdateTransactionData {
  title?: string;
  amount?: number;
  description?: string;
  type?: string;
  date?: Date;  
  category?: string;
  clientId?: number;
  projectId?: number;
  
}

export async function updatetranscation(id: string, data: UpdateTransactionData) {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: data.title,
        amount: data.amount,
        description: data.description || null,
        type: data.type,
        date: data.date,
        category: data.category,
        clientId: data.clientId || null,
        projectId: data.projectId || null,
      },
    });

    return { success: true, data: updatedTransaction };
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}


export async function deletetranscation(id: number) {
  if (!id) {
    throw new Error("Invalid ID provided for deletion");
  }

  try {
    await prisma.transaction.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Failed to delete client");
  }
}