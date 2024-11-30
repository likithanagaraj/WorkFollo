"use server"

import prisma from "@/lib/db"
import { addNewClientFormSchema } from "@/types"
import { z } from "zod"

const createClient = async (values: z.infer<typeof addNewClientFormSchema>) => {
  console.log("Client creating...")
  try {
    console.log("Client creating...")
    const client = await prisma.client.create({
      data: {
        companyName: values.companyName,
        contactName: values.contactName,
        userId: 1,

      }
    })
    console.log("Client created", client)

    return { success: true }
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error }
  }


}


export { createClient }