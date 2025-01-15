"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CloudUpload,
  Paperclip,
  Trash2,
  Plus,
  LoaderCircleIcon,
} from "lucide-react";
import { SmartDatetimeInput } from "@/components/smart-datetime-input";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-uploader";
import {
  addInvoice,
  getInvoice,
  updateInvoice,
} from "@/actions/invoice.action";
import InvoicePDFTemplate from "./invoice-pdf-template";

const serviceSchema = z.object({
  ServiceName: z.string().min(1, "Service name is required"),
  UnitPrice: z.number().min(0, "Unit price must be non-negative"),
  Quantity: z.number().int().min(1, "Quantity must be at least 1"),
  Discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
});

const formSchema = z.object({
  InvoiceNumber: z.number().int().positive("Invoice number must be positive"),
  Date: z.coerce.date(),
  FromName: z.string().min(1, "Name is required"),
  FromCompanyName: z.string().min(1, "Company name is required"),
  FromCompanyAddress: z.string().min(1, "Company address is required"),
  BankDetails: z.string().min(1, "Bank details are required"),
  Logo: z.instanceof(File).optional(),
  ToName: z.string().min(1, "Recipient name is required"),
  ToAddress: z.string().min(1, "Recipient address is required"),
  ToCompanyName: z.string().min(1, "Recipient company name is required"),
  Services: z.array(serviceSchema).min(1, "At least one service is required"),
});

export default function InvoiceForm({
  userId,
  editId,
}: {
  userId: number;
  editId?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Date: new Date(),
      Services: [{ ServiceName: "", UnitPrice: 0, Quantity: 1, Discount: 0 }],
    },
  });

  useEffect(() => {
    const loadExistingInvoice = async () => {
      if (!editId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const invoice = await getInvoice(Number(editId));
        if (invoice) {
          form.reset({
            InvoiceNumber: invoice.InvoiceNumber,
            BankDetails: invoice.BankDetails,
            Date: invoice.Date,
            FromCompanyAddress: invoice.FromCompanyAddress,
            FromCompanyName: invoice.FromCompanyName,
            FromName: invoice.FromName,
            Logo: invoice.Logo ? new File([], invoice.Logo) : undefined,
            ToAddress: invoice.ToAddress,
            ToCompanyName: invoice.ToCompanyName,
            ToName: invoice.ToName,
            Services: invoice.Services,
          });
        }
      } catch (error) {
        console.error("Error loading contract:", error);
        toast.error("Failed to load contract details");
      } finally {
        setIsLoading(false);
      }
    };
    loadExistingInvoice();
  }, [editId, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "Services",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      let logoUrl = undefined;
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "Logo" && value instanceof File) {
          formData.append(key, value);
        } else if (key === "Services") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });
      toast.success("Form submitted successfully!");

      const formDataObj = {
        ...values,
        Logo: logoUrl,
        userId: userId,
      };

      if (editId) {
        await updateInvoice(Number(editId), formDataObj);
        toast.success("Invoice updated successfully!");
      } else {
        await addInvoice(formDataObj);
        toast.success("Invoice created successfully!");
      }
      setTimeout(() => {
        const pdfContent = (
          <div ref={targetRef} className="">
            <InvoicePDFTemplate data={values} />
          </div>
        );
        toPDF();
      }, 100);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
const data = form.getValues()
const calculateSubtotal = (services: typeof data.Services) => {
  return services.reduce((acc, service) => {
    const amount = service.UnitPrice * service.Quantity;
    const discount = (amount * service.Discount) / 100;
    return acc + (amount - discount);
  }, 0);
};

const subtotal = calculateSubtotal(data.Services);
const tax = subtotal * 0.1; // 10% tax
const total = subtotal + tax;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="py-10 px-16 flex flex-col lg:flex-row gap-24">
          {/* Left Side */}
          <div className="flex flex-col gap-10 flex-1">
            <div className="flex flex-col sm:flex-row gap-4 justify-between border px-6 py-6">
              <FormField
                control={form.control}
                name="InvoiceNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5"
                        placeholder="Invoice Number"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <SmartDatetimeInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="e.g. Tomorrow morning 9am"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Bill From */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bill From</h3>
              <div className="rounded-lg border  border-gray-200 bg-white shadow-sm">
                <div className="grid gap-6 p-6 ">
                  <FormField
                    control={form.control}
                    name="FromName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="FromCompanyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="FromCompanyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete company address"
                            className="resize-none min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="BankDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Account Number, IFSC Code, Account Name, Branch Name"
                            className="resize-none min-h-[112px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-10 flex-1">
            {/* Logo Upload */}
            <FormField
              control={form.control}
              name="Logo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      value={file ? [file] : []}
                      onValueChange={(files) => {
                        setFile(files ? files[0] || null : null);
                        field.onChange(files ? files[0] || null : null);
                      }}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-7 w-full ">
                          <CloudUpload className="text-gray-500 " />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {file &&
                          [file].length > 0 &&
                          [file].map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bill To */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bill To</h3>
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="grid gap-6 p-6">
                  <FormField
                    control={form.control}
                    name="ToName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter recipient name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ToCompanyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter recipient company name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ToAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter recipient complete address"
                            className="resize-none min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Products and Services</h3>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-wrap gap-4 p-6 border items-end rounded-md"
                >
                  <FormField
                    control={form.control}
                    name={`Services.${index}.ServiceName`}
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[200px]">
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Service Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`Services.${index}.UnitPrice`}
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[150px]">
                        <FormLabel>Unit Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Unit Price"
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`Services.${index}.Quantity`}
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[100px]">
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantity"
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`Services.${index}.Discount`}
                    render={({ field }) => (
                      <FormItem className="flex-1 min-w-[100px]">
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Discount"
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="default"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 " />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({
                    ServiceName: "",
                    UnitPrice: 0,
                    Quantity: 1,
                    Discount: 0,
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <Button
             
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : editId ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
        {/* Invoice */}
        <div ref={targetRef} className=" p-8 max-w-4xl mx-auto bg-white">
          {/* Header */}
          <div  className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">Invoice #{data.InvoiceNumber}</p>
              <p className="text-gray-600">
                Date: {new Date(data.Date).toLocaleDateString()}
              </p>
            </div>
            {data.Logo && (
              <div className="w-32">
                <img
                  src={URL.createObjectURL(data.Logo)}
                  alt="Company Logo"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* Bill From/To Section */}
          <div className="flex justify-between mb-8">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">Bill From:</h2>
              <div className="text-gray-700">
                <p className="font-semibold">{data.FromName}</p>
                <p>{data.FromCompanyName}</p>
                <p className="whitespace-pre-line">{data.FromCompanyAddress}</p>
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
              <div className="text-gray-700">
                <p className="font-semibold">{data.ToName}</p>
                <p>{data.ToCompanyName}</p>
                <p className="whitespace-pre-line">{data.ToAddress}</p>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Service</th>
                <th className="py-2 px-4 text-right">Unit Price</th>
                <th className="py-2 px-4 text-right">Quantity</th>
                <th className="py-2 px-4 text-right">Discount</th>
                <th className="py-2 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.Services.map((service, index) => {
                const amount = service.UnitPrice * service.Quantity;
                const discount = (amount * service.Discount) / 100;
                const final = amount - discount;

                return (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{service.ServiceName}</td>
                    <td className="py-2 px-4 text-right">
                      ${service.UnitPrice.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-right">{service.Quantity}</td>
                    <td className="py-2 px-4 text-right">
                      {service.Discount}%
                    </td>
                    <td className="py-2 px-4 text-right">
                      ${final.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-2">Bank Details:</h2>
            <p className="whitespace-pre-line text-gray-700">
              {data.BankDetails}
            </p>
          </div>
        </div>
        {/* Services */}
      </form>
    </Form>
  );
}
