"use client";
import React, { useState } from "react";
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
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SignInForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    // console.log(values);
    try {
      const result = await signInAction(values);
      console.log("result")
      console.log(result)
      if (result.success) {
        toast.success("Login Success");
        router.push("/app");
      } else {
        // console.log("Login Failed", result.error);
        toast.error(`Login Failed: ${result.error}`);
        // toast.success("Login Failed");
      }
    } catch (error) {
      // console.log(error);
      // console.log("Login Failed");
      toast.error("Login Failed");
    }
    setLoading(false);
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className={cn(" flex items-center justify-center p-4", className)}>
      <div className="w-full max-w-md space-y-6  p-6">
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
                    <div className="relative">

                      <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="******"
                        {...field}
                        className="w-full"
                      />
                      <Button
                      variant={"secondary"}
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                      >
                        {isVisible ? (
                          <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                          <EyeIcon size={16} aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4 pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "Login"
                )}
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
