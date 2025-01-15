"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  createProject,
  getProject,
  updateProject,
} from "@/actions/project.actions";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon, Plus, Trash2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { addNewProjectformSchema } from "@/types";

function ClientForm({ id }: { id: string | string[] | undefined }) {
  
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [clients, setClients] = useState<{ id: number; companyName: string }[]>(
    []
  );

  const form = useForm<z.infer<typeof addNewProjectformSchema>>({
    resolver: zodResolver(addNewProjectformSchema),
    defaultValues: {
      services: [
        { serviceName: "", serviceAmount: 0, unit: "", servicedescription: "" },
      ],
      billings: [{ billingTitle: "", amount: 0 }],
    },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const {
    fields: billingFields,
    append: appendBilling,
    remove: removeBilling,
  } = useFieldArray({
    control: form.control,
    name: "billings",
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

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      setLoading(true);
      try {
        id = id as string;
        const project = await getProject(id);
        if (project) {
          form.reset({
            projectName: project.name,
            client: project.Client.id,
            startDate: project.startDate
              ? new Date(project.startDate)
              : new Date(),
            endDate: project.endDate ? new Date(project.endDate) : new Date(),
            status: project.status ?? "",
            services: project.services.map((service) => ({
              serviceName: service.name,
              serviceAmount: service.amount,
              unit: service.unit,
              servicedescription: service.description ?? undefined,
            })),
            contract: project.contract || "",
            description: project.description || "",
            billings: project.billings.map((billing) => ({
              billingTitle: billing.title,
              amount: billing.amount,
            })),
          });
        }
      } catch (error) {
        toast.error("Failed to load project data");
        console.error(error);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof addNewProjectformSchema>) {
    // console.log("Edit");
    setLoading(true);

    try {
      if (id) {
        id = id as string;
        const transformedData = {
          name: values.projectName,
          clientId: values.client,
          startDate: values.startDate,
          endDate: values.endDate,
          contract: values.contract,
          description: values.description,
          status: values.status,
          services: {
            create: values.services.map((service) => ({
              name: service.serviceName,
              amount: service.serviceAmount,
              unit: service.unit,
              description: service.servicedescription,
            })),
          },
          billings: {
            create: values.billings.map((billing) => ({
              title: billing.billingTitle,
              amount: billing.amount,
            })),
          },
        };
        await updateProject(id, transformedData);
        toast.success("Project updated successfully!");
        router.push("/app/projects");
      } else {
        const createData = {
          projectName: values.projectName,
          client: values.client,
          startDate: values.startDate,
          endDate: values.endDate,
          contract: values.contract,
          description: values.description,
          status: values.status,
          services: values.services,
          billings: values.billings,
        };

        await createProject(createData);
        router.push("/app/projects");
        toast.success("Project created successfully!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div className="max-w-3xl py-5 rounded-lg ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-3xl "
        >
          <h1 className="text-[25px] font-semibold">Project Details </h1>
          <div className=" rounded-lg p-7 border flex flex-col gap-3">
            {/* Project Name Field */}

            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-full">Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="UnicornSpace" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client Selection */}
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-full">Client</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contract Field */}
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contract Reference"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder="Project Description"
                      type="text"
                      {...field}
                    /> */}
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Selection */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="incomplete">Incomplete</SelectItem>
                      <SelectItem value="on progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Fields */}
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
                        />
                      </FormControl>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Services Section */}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[25px] font-semibold">Services</h1>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  appendService({
                    serviceName: "",
                    serviceAmount: 0,
                    unit: "",
                    servicedescription: "",
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
            {serviceFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Service {index + 1}</h2>
                  {serviceFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeService(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex w-full items-center justify-between">
                  <FormField
                    control={form.control}
                    name={`services.${index}.serviceName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Service Name"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <FormField
                    control={form.control}
                    name={`services.${index}.serviceAmount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Amount"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.unit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="per day">per day</SelectItem>
                            <SelectItem value="per hour">per hour</SelectItem>
                            <SelectItem value="per item">per item</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                </div>

                <FormField
                  control={form.control}
                  name={`services.${index}.servicedescription`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          {/* Billing Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[25px] font-semibold">Billing</h1>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendBilling({ billingTitle: "", amount: 0 })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Billing
              </Button>
            </div>

            {billingFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Billing {index + 1}</h2>
                  {billingFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeBilling(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`billings.${index}.billingTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Title</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Once">Once</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`billings.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

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
    </div>
  );
}

export default ClientForm;
