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
import {
  createTransaction,
  fetchProjectBasedonClient,
  getTranscation,
  updatetranscation,
} from "@/actions/transcation.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchClients } from "@/actions/client.actions";
import { LoaderCircleIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface Client {
  id: number;
  companyName: string;
}
interface Project {
  id: number;
  name: string;
}
interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: Date;
  type: string;
  category: string;
  description?: string | null;
  clientId?: number | null;
  projectId?: number | null;
  Client?: Client | null;
  Project?: Project | null;
}
type FormValues = z.infer<typeof addTransactionformSchema>;

export default function TranscationForm({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(addTransactionformSchema),
    defaultValues: {
      clientId: null,
      projectId: null,
      title: "",
      amount: "",
      type: "",
      description: "",
      date: new Date(),
    },
  });
  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
        // return fetchedClients;
      } catch (error) {
        toast.error("Failed to load clients");
        console.error(error);
        return [];
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    if (!id) return;

    const loadTransactionAndProjects = async () => {
      setLoading(true);
      id = id as string;
      try {
        const transaction = await getTranscation(id);
        if (transaction.clientId) {
          const fetchedProjects = await fetchProjectBasedonClient(
            transaction.clientId
          );
          setProjects(fetchedProjects);

          form.reset({
            clientId: transaction.clientId,
            projectId: transaction.projectId,
            title: transaction.title,
            amount: transaction.amount.toString(),
            type: transaction.type,
            description: transaction.description || "",
            date: new Date(transaction.date),
            // category: transaction.category,
          });
        }
        console.log("Form Values After Reset:", form.getValues());

        // setInitialLoadComplete(true);
      } catch (error) {
        toast.error("Failed to load transaction data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadTransactionAndProjects();
  }, [id, form]);

  const handleClient = async (value: string) => {
    try {
      const clientId = Number(value);
      const fetchedProjects = await fetchProjectBasedonClient(clientId);
      setProjects(fetchedProjects);
      form.setValue("projectId", null);
    } catch (error) {
      toast.error("Failed to load projects");
      console.error(error);
    }
  };

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const formattedValues = {
        title: values.title,
        amount: values.amount, // Keep as string, conversion happens in createTransaction
        description: values.description || null,
        type: values.type,
        date: values.date,
        clientId: values.clientId,
        projectId: values.projectId,
      };

      if (id) {
        await updatetranscation(id as string, {
          ...formattedValues,
          amount: parseFloat(formattedValues.amount), // Convert to number for update
        });
        toast.success("Transaction updated successfully");
      } else {
        await createTransaction(formattedValues);
        toast.success("Transaction created successfully");
      }
      router.push("/app/transactions");
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl  p-8 rounded-lg space-y-4 border"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Client </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value ? Number(value) : null);
                    handleClient(value);
                  }}
                  value={field.value?.toString() || ""}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
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
            name="projectId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project </FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value ? Number(value) : null)
                  }
                  value={field.value?.toString() || ""}
                  disabled={loading || !form.watch("clientId")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project) => (
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
        </div>

        <div className="grid grid-cols-12 gap-4 items-center ">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount"
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Amount</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center ">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
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

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
          {/* <div className="col-span-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : id ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
