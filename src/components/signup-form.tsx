"use client";

import React from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
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
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    // console.log(values);

    const res = await signUpAction(values);
    // console.log(" 😂😂",res)
    if (res.success) {
      toast.success(res.data);
      router.push("/app");
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen md:mt-10 flex items-center justify-center w-[500px]">
      <div className="w-full max-w-md space-y-6 p-6 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <PasswordField field={field} />
                    {/* <Input
                      type="password"
                      {...field}
                      className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                    /> */}
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
                  <FormLabel className="font-medium">
                    Confirm Password
                  </FormLabel>
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
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "Register"
                )}
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

import { Label } from "@/components/ui/label";
import {
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LoaderCircleIcon,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

function PasswordField({
  field,
}: {
  field: ControllerRenderProps<
    {
      password: string;
      name: string;
      email: string;
      confirmPassword: string;
    },
    "password"
  >;
}) {
  const [password, setPassword] = useState(field.value);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="space-y-2">
        <Label htmlFor="input-51">Input with password strength indicator</Label>
        <div className="relative">
          <Input
            id="input-51"
            className="pe-9"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            {...field}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              field.onChange(e.target.value);
            }}
            aria-invalid={strengthScore < 4}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Password strength indicator */}
      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      {/* Password strength description */}
      <p
        id="password-strength"
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
