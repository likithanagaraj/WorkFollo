"use client";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartDatetimeInput } from "./smart-datetime-input";
import { fetchClients } from "@/actions/client.actions";
import { addNewProjectformSchema } from "@/types";
import { createProject } from "@/actions/project.actions";
import { useRouter } from "next/navigation";



function ProjectForm() {
  const router = useRouter();
  const [clients, setClients] = useState<{ id: number; companyName: string }[]>(
    []
  );

  const handleContract: () => void = () => {
  router.push("/app/agreements");
  };
  const form = useForm<z.infer<typeof addNewProjectformSchema>>({
    resolver: zodResolver(addNewProjectformSchema),
    defaultValues: {
      projectName: "",
      client: undefined,
      startDate: undefined,
      endDate: undefined,
      serviceName: "",
      amount: 0,
      unit: "",
      billing: "",
      // contract: "",
      description: "",
      status: "",
    },
  });

  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (error) {
        toast.error("Failed to load clients");
        console.error(error);
      }
    };

    loadClients();
  }, []);

  async function onSubmit(values: z.infer<typeof addNewProjectformSchema>) {
    try {
      console.log(values);
      const response = await createProject(values);
      if (response.success) {
        toast("Event has been created.");
        router.push("/app/projects");
      } else toast("Error creating event");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="px-8  border  shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-3xl mx-auto py-10"
        >
          <h1 className="text-[25px] font-semibold ">Project Details</h1>
          <div className="bg-[#FAFAFA] p-7 shadow-sm flex flex-col gap-3">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" type="text" {...field} />
                  </FormControl>
                  {/* <FormDescription>Project Name</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))} // Convert to number
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder=" " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
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
            {/* Contract Input */}
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="incomplete">incomplete</SelectItem>
                      <SelectItem value="on progress">on progress</SelectItem>
                      <SelectItem value="done">done</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>status</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <SmartDatetimeInput
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="e.g. Tomorrow morning 9am"
                          // locale={bg}
                          // hour12
                        />
                      </FormControl>
                      {/* <FormDescription>Start Date of Project </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <SmartDatetimeInput
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="e.g. Tomorrow morning 9am"
                          // locale={bg}
                          // hour12
                        />
                      </FormControl>
                      {/* <FormDescription>End Date of Project </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <h1 className="text-[25px] font-semibold">Services</h1>
          <div className="grid grid-cols-12 gap-4 bg-[#FAFAFA] p-7 shadow-sm">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Service Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Service Name</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
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

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Flat fee">Flat fee</SelectItem>
                        <SelectItem value="Per hour">Per hour</SelectItem>
                        <SelectItem value="Per day">Per day</SelectItem>
                        <SelectItem value="Per item">Per item</SelectItem>
                        <SelectItem value="Per word">Per word</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>Unit</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <h1 className="text-[25px] font-semibold">Billing</h1>
          <div className="bg-[#FAFAFA] p-7 shadow-sm">
            <FormField
              control={form.control}
              name="billing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How are you taking payments</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How are you taking payments" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Once">Once</SelectItem>
                      <SelectItem value="weekly">weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="On milestone">On milestone</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h1 className="text-[25px] font-semibold">Contract</h1>
          <div className="bg-[#FAFAFA] p-7 shadow-sm ">
            <FormField
              control={form.control}
              name="billing"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Contract</FormLabel>
                 <div className="flex gap-10 items-center">
                 <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Once">Default</SelectItem>

                      {/* <SelectItem value="weekly">weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="On milestone">On milestone</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleContract}>
                    Submit
                  </Button>
                 </div>
                  <FormMessage />
                  
                </FormItem>
                
              )}
            />
          </div>

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProjectForm;

// <FormField
//               control={form.control}
//               name="contract"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contract</FormLabel>
//                   <FormControl>
//                     <Input placeholder="contract" type="text" {...field} />
//                     {/* <Tiptap/> */}
//                   </FormControl>
//                   <FormDescription>Contract</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
