"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { addNewProjectformSchema } from "@/types";
import { z } from "zod";




export async function getProject(id: string) {
  const project = await prisma.project.findMany({
    where: {
      id: parseInt(id)
    },
    include: {
      Client: true,
      services: true,
      billings: true,
    },

  });


  if (project.length === 0) throw new Error("Project not found");

  return project[0];


}

// interface UpdateProjectData {
//   name?: string;
//   clientId?: number;
//   startDate?: Date;
//   endDate?: Date;
//   contract?: string;
//   description?: string;
//   services?: {
//     create?: {
//       name: string;
//       amount: number;
//       unit: string;
//       description: string;
//     }[];
//   },
//   billings?:{
//     create?:{
//       title: string;
//       amount: number;
//     }[];
//   }
//   userId?: number;
//   status?: string;
// }
interface ProjectUpdateData {
  name?: string;
  clientId?: number;
  startDate?: Date;
  endDate?: Date;
  contract?: string;
  description?: string;
  services?: {
    create?: {
      name: string;
      amount: number;
      unit: string;
      description: string;
    }[];
  };
  billings?: {
    create?: {
      title: string;
      amount: number;
    }[];
  };
  userId?: number;
  status?: string;
}
export async function updateProject(id: string, data: ProjectUpdateData) {
  try {
    // First delete existing services and billings
    await prisma.$transaction([
      prisma.service.deleteMany({
        where: { projectId: parseInt(id) }
      }),
      prisma.billing.deleteMany({
        where: { projectId: parseInt(id) }
      })
    ]);

    // Then update project with new data
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        clientId: data.clientId,
        startDate: data.startDate,
        endDate: data.endDate,
        contract: data.contract,
        description: data.description,
        status: data.status,
        services: data.services,
        billings: data.billings
      },
      include: {
        services: true,
        billings: true
      }
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    throw new Error("Failed to update project");
  }
}


export const createProject = async (
  values: z.infer<typeof addNewProjectformSchema>
) => {
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
        services: {
          create: values.services.map(service => ({
            name: service.serviceName,
            amount: service.serviceAmount,
            unit: service.unit,
            description: service.servicedescription,
          }))
        },
        billings: {
          create: values.billings.map(billing => ({
            title: billing.billingTitle,
            amount: billing.amount,
          }))
        },
        userId: Number(session?.user?.id),
        status: values.status,
      },
    });
    console.log("Project created", values);

    return { success: true };
  } catch (error) {
    console.error("Form submission error", error);
    return { success: false, error };
  }
};

export async function deleteProject(id: number) {
  if (!id) {
    throw new Error("Invalid ID provided for deletion");
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Failed to delete client");
  }
}