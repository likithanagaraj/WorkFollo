"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SmartDatetimeInput } from "./smart-datetime-input";
import { addTransactionformSchema } from "@/types";
import { createTransaction, fetchProjectBasedonClient } from "@/actions/transcation.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchClients } from "@/actions/client.actions";

export default function TranscationForm() {
  const router = useRouter();
  const [clients, setClients] = useState<{ id: number; companyName: string }[]>(
    []
  );
  const [project, setProject] = useState<{ id: number; name: string }[]>([]);
  const form = useForm<z.infer<typeof addTransactionformSchema>>({
    resolver: zodResolver(addTransactionformSchema),
    defaultValues: {
      Client: undefined,
      title: "",
      amount: undefined,
      type: "",
      description: "",
      date: undefined,
      category: "",
      Project: undefined,
    },
  });

  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        const { id } = fetchedClients[0];
        console.log(id);
        const fetchedProject = await fetchProjectBasedonClient(id);
        setClients(fetchedClients);
        setProject(fetchedProject);
      } catch (error) {
        toast.error("Failed to load clients");
        console.error(error);
      }
    };

    loadClients();
  }, []);

  

  const handleClient = async (value: string) => {
    try {
      
      const id = Number(value);
      const fetchedProject = await fetchProjectBasedonClient(id);
      setProject(fetchedProject);
    } catch (error) {
      toast.error("Failed to load project");
      console.error(error);
    }
  }

  async function onSubmit(values: z.infer<typeof addTransactionformSchema>) {
    console.log(values);
    try {
     
      const response = await createTransaction(values);
      if (response.success) {
        toast("Event has been created.");
        router.push("/app/transactions");
      } else toast("Error creating event");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="px-8 border  shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="Client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client </FormLabel>
                <Select
                  onValueChange={(value: string) => {
                  field.onChange(Number(value));
                  handleClient(value);
                  }}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="client" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {clients.map((client: { id: number; companyName: string }) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                    {client.companyName}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>Client List</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {project.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id.toString()}
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>Client List</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4 items-center ">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" type="text" {...field} />
                    </FormControl>
                    {/* <FormDescription>Title</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Amount" type="number" {...field} />
                    </FormControl>
                    {/* <FormDescription>Amount</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <SmartDatetimeInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="e.g. Tomorrow morning 9am"
                      />
                    </FormControl>
                    {/* <FormDescription>date</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CAC">CAC</SelectItem>
                        <SelectItem value="Expenses">Expenses </SelectItem>
                        <SelectItem value="Payments">Payments</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>type</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="category" type="" {...field} />
                    </FormControl>
                    {/* <FormDescription>category</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} />
                </FormControl>
                {/* <FormDescription>Description</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
