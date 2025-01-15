'use server'

import prisma from "@/lib/db";

interface ServiceItem {
  ServiceName: string;
  UnitPrice: number;
  Quantity: number;
  Discount: number;
}

interface InvoiceSchema {
  InvoiceNumber: number;
  id?: number;
  Date: Date;
  FromName: string;
  FromCompanyName: string;
  FromCompanyAddress: string;
  BankDetails: string;
  Logo?: string | null;
  ToName: string;
  ToAddress: string;
  ToCompanyName: string;
  Services: ServiceItem[];
  userId: number;
}

export async function addInvoice(data: InvoiceSchema) {
  try {
    const createInvoice = await prisma.invoice.create({
      data: {
        userId: data.userId,
        invoiceNumber: data.InvoiceNumber,
        date: data.Date,
        fromName: data.FromName,
        fromCompanyName: data.FromCompanyName,
        fromCompanyAddress: data.FromCompanyAddress,
        bankDetails: data.BankDetails,
        logo: data.Logo,
        toName: data.ToName,
        toAddress: data.ToAddress,
        toCompanyName: data.ToCompanyName,
        services: {
          create: data.Services.map(service => ({
            serviceName: service.ServiceName,
            unitPrice: service.UnitPrice,
            quantity: service.Quantity,
            discount: service.Discount
          }))
        }
      },
      include: {
        services: true
      }
    });
    return createInvoice;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice");
  }
}

export async function getInvoice(id: number) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: id
      },
      include: {
        services: true
      }
    });
    
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    // Transform the data to match form structure
    return {
      id: invoice.id,
      InvoiceNumber: invoice.invoiceNumber,
      Date: invoice.date,
      FromName: invoice.fromName,
      FromCompanyName: invoice.fromCompanyName,
      FromCompanyAddress: invoice.fromCompanyAddress,
      BankDetails: invoice.bankDetails,
      Logo: invoice.logo,
      ToName: invoice.toName,
      ToAddress: invoice.toAddress,
      ToCompanyName: invoice.toCompanyName,
      Services: invoice.services.map(service => ({
        ServiceName: service.serviceName,
        UnitPrice: service.unitPrice,
        Quantity: service.quantity,
        Discount: service.discount
      }))
    };
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw new Error("Failed to fetch invoice");
  }
}

export async function updateInvoice(id: number, data: InvoiceSchema) {
  try {
    // First, delete existing services
    await prisma.invoiceService.deleteMany({
      where: {
        invoiceId: id
      }
    });

    // Then update the invoice with new data
    const updateInvoice = await prisma.invoice.update({
      where: {
        id: id
      },
      data: {
        invoiceNumber: data.InvoiceNumber,
        date: data.Date,
        fromName: data.FromName,
        fromCompanyName: data.FromCompanyName,
        fromCompanyAddress: data.FromCompanyAddress,
        bankDetails: data.BankDetails,
        logo: data.Logo,
        toName: data.ToName,
        toAddress: data.ToAddress,
        toCompanyName: data.ToCompanyName,
        services: {
          create: data.Services.map(service => ({
            serviceName: service.ServiceName,
            unitPrice: service.UnitPrice,
            quantity: service.Quantity,
            discount: service.Discount
          }))
        }
      },
      include: {
        services: true
      }
    });
    return updateInvoice;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw new Error("Failed to update invoice");
  }
}

export async function deleteInvoice(id: number) {
  if (!id) {
    throw new Error("Invalid ID provided for deletion");
  }
  try {
    // First delete related services
    await prisma.invoiceService.deleteMany({
      where: {
        invoiceId: id
      }
    });

    // Then delete the invoice
    await prisma.invoice.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw new Error("Failed to delete invoice");
  }
}