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
export async function fetchProjectBasedonClient(id: number) {
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

export async function getTranscation(id: string) {
  const transcation = await prisma.transaction.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Client: true,
      Project: true,
    },
  });

  if (!transcation) throw new Error("Transaction not found");
  return transcation;
}
interface CreateTransactionInput {
  title: string;
  amount: string; // Keep as string since it comes from form
  date: Date;
  type: string;
  description: string | null;
  clientId: number | null;
  projectId: number | null;
}
export const createTransaction = async (values: CreateTransactionInput) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const client = await prisma.transaction.create({
      data: {
        title: values.title,
        amount: parseFloat(values.amount),
        date: values.date,
        type: values.type,
        userId: Number(session.user.id),
        description: values.description || null,
        projectId: values.projectId || null,
        clientId: values.clientId || null,
        category: "default", // Add a default category or get it from values if available
      },
    });

    return { success: true, data: client };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Transaction creation error:", error.message);
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
    throw new Error("Failed to create transaction");
  }
};

// First, define the interface for update data
interface UpdateTransactionData {
  title: string;
  amount: number;
  description: string | null;
  type: string;
  date: Date;
  category?: string;
  clientId: number | null;
  projectId: number | null;
}

export async function updatetranscation(
  id: string,
  data: UpdateTransactionData
) {
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const transactionId = Number(id);
  if (isNaN(transactionId)) {
    throw new Error("Invalid transaction ID format");
  }

  try {
    // Verify transaction exists before update
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTransaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        title: data.title,
        amount: data.amount,
        description: data.description ?? null,
        type: data.type,
        date: data.date,
        category: data.category ?? existingTransaction.category, // Keep existing if not provided
        clientId: data.clientId ?? null,
        projectId: data.projectId ?? null,
      },
    });

    return { success: true, data: updatedTransaction };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating transaction:", error.message);
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
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
