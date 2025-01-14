import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const addNewClientFormSchema = z.object({
  companyName: z.string(),
  contactName: z.string(),
  contactEmail: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  description: z.string(),
});

export const addNewProjectformSchema = z.object({
  projectName: z.string(),
  client: z.number(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  services: z.array(
    z.object({
      serviceName: z.string().min(1, "Service name is required"),
      serviceAmount: z.number().positive("Amount must be positive"),
      unit: z.string().min(1, "Unit is required"),
      servicedescription: z.string(),
    })
  ),
  contract: z.string(),
  description: z.string(),
  status: z.string(),
  billings: z.array(
    z.object({
      billingTitle: z.string(),
      amount: z.number().positive("Amount must be positive"),
    })
  ),
});

export const addTransactionformSchema = z.object({
  clientId: z.number().nullable(),
  projectId: z.number().nullable(),
  title: z.string(),
  amount: z.string(),
  date: z.coerce.date(),
  type: z.string(),
  description: z.string().nullable(),
  category: z.string(),
});

export type Params = Promise<{ slug: string }>


export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
