"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { PhoneInput } from "./ui/phone-input";
import { createClient } from "@/actions/client.actions";
import { addNewClientFormSchema } from "@/types";

function ClientForm() {
  const form = useForm<z.infer<typeof addNewClientFormSchema>>({
    resolver: zodResolver(addNewClientFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      contactEmail: "",
      phoneNumber: "",
      address: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addNewClientFormSchema>) {
    const response = await createClient(values);
    if (response.success) toast("Event has been created.");
    else toast("Error creating event");
  }
  return (
    <div className="px-8  border w-[600px] shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5  mx-auto py-10 "
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="flex items-center   ">
                <FormLabel className="w-full ">Company Name </FormLabel>
                <FormControl>
                  <Input placeholder="UnicornSpace" type="" {...field} />
                </FormControl>
                {/* <FormDescription className="">
                  This is your public Company name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full ">Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Likitha" type="text" {...field} />
                </FormControl>
                {/* <FormDescription>This is your contact name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full ">Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
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
                <FormControl className="w-full ">
                  <PhoneInput placeholder="" {...field} defaultCountry="TR" />
                </FormControl>
                {/* <FormDescription>Enter your phone number.</FormDescription> */}
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
                {/* <FormDescription>Enter client's Address </FormDescription> */}
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
                  <Input placeholder="" type="" {...field} />
                </FormControl>
                {/* <FormDescription>Description of client</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full " type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ClientForm;
