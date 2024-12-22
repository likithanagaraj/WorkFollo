"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addNewClientFormSchema } from "@/types";
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
