import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import InvoicePDFTemplate from "@/components/invoice-pdf-template";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function InvoicePage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  
  if (!session) {
    return redirect("/login");
  }

  

  const invoiceData = await prisma.invoice.findUnique({
    where: {
      invoiceNumber: parseInt(id),
      userId: Number(session?.user?.id)
    },
    include: {
      services: true
    }
  });

  if (!invoiceData) {
    notFound();
  }

  // Transform the Prisma data to match the InvoicePDFTemplate props structure
  const transformedData = {
    InvoiceNumber: invoiceData.invoiceNumber,
    Date: invoiceData.date,
    FromName: invoiceData.fromName,
    FromCompanyName: invoiceData.fromCompanyName,
    FromCompanyAddress: invoiceData.fromCompanyAddress,
    BankDetails: invoiceData.bankDetails,
    Logo: invoiceData.logo ? new File([invoiceData.logo], "logo") : undefined,
    ToName: invoiceData.toName,
    ToAddress: invoiceData.toAddress,
    ToCompanyName: invoiceData.toCompanyName,
    Services: invoiceData.services.map(service => ({
      ServiceName: service.serviceName,
      UnitPrice: service.unitPrice,
      Quantity: service.quantity,
      Discount: service.discount
    }))
  };

  return (
    <div className="container mx-auto px-14 py-8 space-y-6 ">
     
      <Link
        href="/app/invoice"
        className="flex gap-1 text-sm items-center text-primary/60 hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} />
        <p>Back</p>
      </Link>
      <div className="border">
      <InvoicePDFTemplate data={transformedData} />
      </div>
    </div>
  );
}

export default InvoicePage;