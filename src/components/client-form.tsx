"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "./ui/phone-input";
import { createClient, getClient, updateClient } from "@/actions/client.actions";
import { addNewClientFormSchema } from "@/types";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useSearchParams } from 'next/navigation'

function ClientForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()
  
  const id = searchParams.get('query');
  const router = useRouter(); 

  const form = useForm<z.infer<typeof addNewClientFormSchema>>({
    resolver: zodResolver(addNewClientFormSchema),
    // defaultValues: {
    //   companyName: "",
    //   contactName: "",
    //   contactEmail: "",
    //   phoneNumber: "",
    //   address: "",
    //   description: "",
    // },
  });

  useEffect (() => {
    if (id) {
      // Fetch client data using a server action
      (async () => {
        setLoading(true);
        const client = await getClient(id);
        if (client) {
          form.reset({
            ...client,
            contactEmail: client.contactEmail || "",
            address: client.address || "",
            description: client.description || "",
            phoneNumber: client.contactPhone || "",
          }); 
        } else {
          toast.error("Client not found");
        }
        setLoading(false);
      })();
    }
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof addNewClientFormSchema>) {
    setLoading(true);

    try {
      if (id) {
        await updateClient(id, values); // Use server action to update
        toast.success("Client updated successfully!");
        router.push("/app/clients");
      } else {
        await createClient(values); // Use server action to create
        toast.success("Client created successfully!");
        router.push("/app/clients");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" max-w-2xl  md:ml-10  py-5 border px-5   rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="companyName"
           
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full">Company Name</FormLabel>
                <FormControl>
                  <Input  placeholder="UnicornSpace"   type="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full">Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Likitha" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full">Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="" {...field} defaultCountry="TR" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="" type="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
          {loading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : id ? "Update" : "Submit"}
           
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ClientForm;
