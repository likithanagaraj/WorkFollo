import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create a free Mimo account",
    description:
      "Fill out an application for yourself, or your clients. Submit business details in 2 minutes.",
  },
  {
    number: "02",
    title: "Connect your accounting platform",
    description:
      "Connect Xero or QuickBooks to populate Mimo with your customer & supplier invoices.",
  },
  {
    number: "03",
    title: "Finalize KYB to open your account",
    description:
      "Explore our platform while we verify your details. We challenge you to finish a cup of tea before it's done.",
  },
  {
    number: "04",
    title: "Save time & improve cash flow instantly",
    description:
      "Pay suppliers & employees with a click. No data entry needed. Get Paid faster with automated AR.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <h2 className="text-4xl font-bold tracking-tight">How it works</h2>
          <Button variant="secondary" className="hidden md:block">
            Request a call
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4 border-l pl-4">
              <span className="text-primary/80 font-medium text-3xl">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-8 w-full md:hidden">
          Request a call
        </Button>
      </div>
    </section>
  );
}
