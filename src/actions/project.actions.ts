"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addNewProjectformSchema } from "@/types";
import { z } from "zod";

export const createProject = async (
  values: z.infer<typeof addNewProjectformSchema>
) => {
  // const totalBudget = values.services ? values.services.reduce((sum, service) => sum + service.amount, 0) : 0
  try {
    const session = await auth();
    const project = await prisma.project.create({
      data: {
        name: values.projectName,
        clientId: values.client,
        startDate: values.startDate,
        endDate: values.endDate,
        contract: values.contract,
        description: values.description,
        // totalBudget: values.totalBudget,
        userId: Number(session?.user?.id),

        status: values.status,
      },
    });
    console.log("Client created", values);

    return { success: true };
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error };
  }
};
