"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addNewClientFormSchema } from "@/types";
import { Client } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createClient = async (values: z.infer<typeof addNewClientFormSchema>) => {
  const session = await auth();
  console.log("Client creating...");
  try {
    console.log("Client creating...");
    const client = await prisma.client.create({
      data: {
        companyName: values.companyName,
        contactName: values.contactName,
        contactEmail: values.contactEmail,
        contactPhone: values.phoneNumber,
        description: values.description,
        userId: Number(session?.user?.id),
      },
    });
    console.log("Client created", client);

    return { success: true };
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error };
  }
};

export async function fetchClients() {
  try {
    // Fetch clients from Prisma
    const session = await auth();

    const clients = await prisma.client.findMany({
      select: {
        id: true,
        companyName: true,
      },
      orderBy: {
        companyName: "asc",
      },
      where: {
        userId: Number(session?.user?.id),
      },
    });

    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
}

export { createClient };


export async function getClient(id: Client['id']) {
  if (!id) throw new Error("Client ID is required");

  // Fetch client data from the database
  const client = await prisma.client.findUnique({
    where: {
      id,
    },
  });

  if (!client) throw new Error("Client not found");

  return client;
}


export async function updateClient(id: string, data: {
  companyName: string;
  contactName: string;
  contactEmail?: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
}) {
  try {
    const updatedClient = await prisma.client.update({
      where: {
        id: parseInt(id), // Convert the ID to an integer
      },
      data: {
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.phoneNumber,
        address: data.address,
        description: data.description,
      },
    });

    return { success: true, client: updatedClient };
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Failed to update client");
  }
}




export async function deleteClient(id: number) {
  if (!id) {
    throw new Error("Invalid ID provided for deletion");
  }
  console.log("Deleting client...");
  try {
    await prisma.client.delete({
      where: { id },
    });
    revalidatePath("/app/clients");
    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Failed to delete client");
  }
}

