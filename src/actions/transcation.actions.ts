import prisma from "@/lib/db"
import { addTransactionformSchema } from "@/types"
import { z } from "zod"

export const createTransaction = async (values: z.infer<typeof addTransactionformSchema>) => {
  try {
    console.log("Transaction creating...")
    const transactionData: any = {
      title: values.title,
      amount: values.amount,
      type: values.type,
      description: values.description,
      date: values.date,
      category: values.category,
      userId: 1, // Hardcoded user ID
    };

    // Only add clientId if a client is selected
    if (values.client) {
      transactionData.clientId = values.client;
    }

    const transaction = await prisma.transaction.create({
      data: transactionData
    });

    console.log("Transaction created", transaction)

    return { success: true }
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error }
  }
}

