"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "./ui/phone-input"
import { createClient, getClient, updateClient } from "@/actions/client.actions"
import { addNewClientFormSchema } from "@/types"
import { LoaderCircleIcon } from 'lucide-react'
import { useEffect, useState } from "react"

function ClientForm({ id }: { id: string | string[] | undefined }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
  })

  useEffect(() => {
    if (id && typeof id === "string") {
      const fetchClient = async () => {
        setLoading(true)
        try {
          const client = await getClient(id)
          if (client) {
            form.reset({
              ...client,
              contactEmail: client.contactEmail || "",
              address: client.address || "",
              description: client.description || "",
              phoneNumber: client.contactPhone || "",
            })
          } else {
            toast.error("Client not found")
          }
        } catch (error) {
          toast.error("Failed to fetch client data")
        } finally {
          setLoading(false)
        }
      }
      fetchClient()
    }
  }, [id, form])

  async function onSubmit(values: z.infer<typeof addNewClientFormSchema>) {
    setLoading(true)
    try {
      if (id && typeof id === "string") {
        await updateClient(id, values)
        toast.success("Client updated successfully!")
      } else {
        await createClient(values)
        toast.success("Client created successfully!")
      }
      router.push("/app/clients")
    } catch (error) {
      toast.error("An error occurred!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-5 px-5 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g 'UnicornSpace'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g."Likitha"' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
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
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} defaultCountry="TR" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircleIcon className="animate-spin mr-2" />
            ) : id ? (
              "Update"
            ) : (
              "Submit"
            )}
            {loading ? "Processing..." : ""}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ClientForm

