// @ts-nocheck
"use server";
 
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { signInFormSchema, signUpFormSchema } from "@/types/index";
import { z } from "zod";
 
const signUpAction = async (data: z.infer<typeof signUpFormSchema>) => {
  console.table(data);
 
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
 
    if (existingUser) {
      return {
        success: false,
        error: "User already exists",
      };
    }
    console.log("creating user", data.email);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
 
    if (newUser) {
      return {
        success: true,
        data: "User created successfully",
      };
    }
    return {
      success: false,
      error: "User creation failed",
    };
  } catch (error) {
    return {
      success: false,
      data: `Something went wrong ${error}`,
    };
  }
};
 
const signInAction = async (data: z.infer<typeof signInFormSchema>) => {
  try {
    const req = await signIn("credentials", { ...data, redirect: false });
    console.log(" from action", req);
    return {
      success: true,
      data: req,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error", error);
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            success: false,
            error: error.message.split("Read more")[0],
          };
        }
        default: {
          return {
            success: false,
            error: "Something went wrong",
          };
        }
      }
    }
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
 
const signOutAction = async () => {
  console.log("signing out");
  await signOut();
};
 
const getUserDetails = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
 
  return user;
};
 
export { signInAction, signOutAction, signUpAction, getUserDetails };