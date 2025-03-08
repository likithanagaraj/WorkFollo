// Dependencies: pnpm install lucide-react

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
// import DialogImg from "@/public/dialog-content.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Joyride from "react-joyride";

export default function OnboardingDialog() {
  const steps = [
    {
      target: ".first-feature",
      content: "You total income is displayed here",
    },
    {
      target: ".second-feature",
      content: "Your total expenses displayed here",
    },
    {
      target: ".third-feature",
      content: "This is showing your monthly revenue",
    },
    {
      target: ".fourth-feature",
      content: "This is a representation of you growth in revenue and your expenses.",
    },
  ];
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const stepContent = [
    {
      title: "Welcome to WorkSpace Management",
      description:
        "Discover a powerful collection of tools designed to enhance your workflow.",
    },
    {
      title: "Create clients, projects and transactions",
      description:
        "Each component is fully customizable and built with modern web standards in mind.",
    },
    {
      title: "Manage Contracts and Invoices",
      description:
        "Begin building amazing interfaces with our comprehensive component library.",
    },
    {
      title: "Get Started",
      description:
        "Access our extensive documentation and community resources to make the most of Origin UI.",
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
      open={isOpen}
    >
      {!isOpen && (
        <Joyride
          styles={{
            options: {
              arrowColor: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--background))",
              primaryColor: "hsl(var(--primary))",
              textColor: "hsl(var(--foreground))",
            },
          }}
          steps={steps}
        />
      )}

      <DialogTrigger asChild>
        {/* <Button variant="outline">Onboarding</Button> */}
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2 max-w-xl ">
          <Image
            className="w-full rounded-lg size-90"
            src={"https://illustrations.popsy.co/gray/freelancer.svg"}
            width={82}
            height={86}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Skip
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button onClick={() => setIsOpen(false)} type="button">
                    Okay
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
