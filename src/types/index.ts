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