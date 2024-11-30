import prisma from "@/lib/db"
import { addTransactionformSchema } from "@/types"
import { z } from "zod"

export const createTransaction = async (values: z.infer<typeof addTransactionformSchema>) => {
  try {
    console.log("Transcation creating...")
    const client = await prisma.transaction.create({
      data:{
        amount: values.amount,
        description: values.description,
        type: values.type,
        date: values.date,
        title: values.title,
        category: values.category,
        userId:1
      }
    })
    console.log("Transcation created", client)

    return { success: true }
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error }
  }
}

