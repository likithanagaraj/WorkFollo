"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/types/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "@/actions/auth.action";
 
const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
 
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    console.log(values);
    const res = await signUpAction(values);
    if (res.success) {
      toast.success(res.data);
      router.push("/app");
    } else {
      toast.error(res.error);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center w-[500px]">
      <div className="w-full max-w-md space-y-6 p-6 border rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name" 
                      {...field} 
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormDescription className="text-xs pl-1 text-muted-foreground">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage className="text-xs pl-1" />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      {...field} 
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs pl-1" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs pl-1" />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium">Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage className="text-xs pl-1" />
                </FormItem>
              )}
            />

            <div className="pt-2 space-y-4">
              <Button 
                type="submit" 
                className="w-full transition-transform duration-200 active:scale-95"
              >
                Register
              </Button>
              
              <div className="text-center">
                <Link 
                  href="/signin" 
                  className="text-sm text-primary hover:opacity-80 transition-opacity"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
 
export default SignUpForm;