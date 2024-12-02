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
  serviceName: z.string(),
  amount: z.string().transform((val) => parseFloat(val)),
  unit: z.string(),
  billing: z.string(),
  contract: z.string(),
  description: z.string(),
  status:z.string()
});


export const addTransactionformSchema = z.object({
  Client: z.number(),
  title: z.string(),
  amount: z.string().transform((val) => parseFloat(val)),
  date: z.coerce.date(),
  type: z.string(),
  description: z.string(),
  category:z.string(),
  Project : z.number()
});