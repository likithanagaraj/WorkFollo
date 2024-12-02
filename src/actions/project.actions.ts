"use server"

import prisma from "@/lib/db"
import { addNewProjectformSchema } from "@/types"
import { z } from "zod"

export const createProject = async (values: z.infer<typeof addNewProjectformSchema>) => {
  try {
    console.log("Project creating...")
    const project = await prisma.project.create({
      data:{
        name: values.projectName,
       clientId: values.client,
        startDate: values.startDate,
        endDate: values.endDate,
        contract: values.contract,
        description: values.description,  
        totalBudget: values.amount,
        status: values.status,
      }
    })
    console.log("Client created", project)

    return { success: true }
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error }
  }
}