"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { signInFormSchema } from "@/types/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import { signInAction } from "@/actions/auth.action";
import { Input } from "./ui/input";
 
const SignInForm = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
 
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    console.log(values);
    try {
      const result = await signInAction(values);
      if (result.success) {
        toast.success("Login Success");
        router.push("/courses");
      } else {
        console.log("Login Failed", result.error);
        toast.error(`Login Failed: ${result.error}`);
      }
    } catch (error) {
      console.log(error);
      console.log("Login Failed");
    }
  };
 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
 
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
 
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button className="w-full">Login</Button>
        <Link className="underline text-primary text-sm" href={"/signup"}>
          Don&apos;t have an account?
        </Link>
      </form>
    </Form>
  );
};
 
export default SignInForm;