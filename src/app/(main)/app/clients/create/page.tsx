import ClientForm from "@/components/client-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CreateClientPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  const id = searchParams.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-5">
        <section className="flex flex-col">
          <Link
            href="/app/clients"
            className="flex gap-1 text-sm items-center text-primary/60 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </section>
        <Suspense fallback={<FormSkeleton />}>
          <ClientForm id={id} />
        </Suspense>
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
