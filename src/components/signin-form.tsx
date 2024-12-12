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
        router.push("/app");
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 border p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      {...field} 
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="******" 
                      {...field} 
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col space-y-4 pt-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              
              <div className="text-center">
                <Link 
                  href="/signup" 
                  className="underline text-primary text-sm hover:text-primary/80 transition-colors"
                >
                  Don&apos;t have an account?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
 
export default SignInForm;