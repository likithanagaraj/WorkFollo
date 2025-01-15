"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/slash-command";
import EditorMenu from "@/components/editor/editor-menu";
import { uploadFn } from "@/components/editor/image-upload";
import { defaultExtensions } from "@/components/editor/extensions";
import { TextButtons } from "@/components/editor/selectors/text-buttons";
import { LinkSelector } from "@/components/editor/selectors/link-selector";
import { NodeSelector } from "@/components/editor/selectors/node-selector";
import { MathSelector } from "@/components/editor/selectors/math-selector";
import { ColorSelector } from "@/components/editor/selectors/color-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, LoaderCircleIcon, PenTool } from "lucide-react";
import generatePDF, { usePDF } from "react-to-pdf";

import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import {
  addNewContract,
  getContract,
  updateContract,
} from "@/actions/contract";
import { fetchClients } from "@/actions/client.actions";
import { auth } from "@/lib/auth";
import { Contract } from "@prisma/client";

const formSchema = z.object({
  Name: z.string(),
  companyName: z.string().optional(),
});

const hljs = require("highlight.js");
const extensions = [...defaultExtensions, slashCommand];

const createTemplateContent = (text: string): JSONContent => {
  const lines = text.split("\n");
  const content = lines.map((line) => {
    if (line.trim() === "") {
      return { type: "paragraph" };
    }
    return {
      type: "paragraph",
      content: [{ type: "text", text: line }],
    };
  });
  return { type: "doc", content };
};

const initialTemplates = [
  `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is made on [Date] by and between:

Employer: [Employer's Name]  
Address: [Employer's Address]  

Employee: [Employee's Name]  
Address: [Employee's Address]  

1. Position: The Employer agrees to hire the Employee for the position of [Job Title].  
2. Salary: The Employee will receive a salary of $[Amount] per [Month/Year].  
3. Term: This Agreement is effective as of [Start Date] and shall continue until terminated.  
4. Duties: The Employee agrees to perform the duties of the position to the best of their abilities.  

[Employer's Signature]  
[Employee's Signature]  
`,
  `SERVICE AGREEMENT...`, // Your second template
  `RENTAL AGREEMENT...`, // Your third template
].map(createTemplateContent);

export default function Editor({
  userId,
  editId,
}: {
  userId: number;
  editId: string | string[] | undefined;
}) {
  const [clients, setClients] = useState<{ id: number; companyName: string }[]>(
    []
  );
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplateNo, setSelectedTemplateNo] = useState(0);
  const templateNames = ["Template 1", "Template 2", "Template 3"];
  const [editorContent, setEditorContent] = useState<JSONContent>(
    initialTemplates[0]
  );
  interface Contract {
    id: number;
    contractName: string;
    clientId: number;
  }
  const [contract, setcontract] = useState<Contract[]>([]);
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      companyName: "",
    },
  });

  useEffect(() => {
    const loadExistingContract = async () => {
      if (!editId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const contract = await getContract(Number(editId));

        if (contract) {
          // Update form values
          form.reset({
            Name: contract.contractName,
            companyName: contract.clientId?.toString() || "",
          });
        }
      } catch (error) {
        console.error("Error loading contract:", error);
        toast.error("Failed to load contract details");
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingContract();
  }, [editId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const Contractvalues = {
        id: editId ? parseInt(editId as string) : 0,
        contractName: values.Name,
        clientId: values.companyName ? parseInt(values.companyName) : 0,
        userId: userId,
      };
      if (editId) {
        await updateContract(Contractvalues);
        toast.success("Contract updated successfully");
      } else {
        await addNewContract(Contractvalues);
        toast.success("Contract created successfully");
      }
      // console.log(values,session?.user?.id);

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const handleTemplateChange = (value: string) => {
    const templateIndex = Number(value) - 1;
    if (templateIndex >= 0 && templateIndex < initialTemplates.length) {
      setSelectedTemplateNo(templateIndex);
      setEditorContent(initialTemplates[templateIndex]);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      await toPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container mx-auto px-2 py-8 max-w-6xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contract Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>Contract Name</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select the compancy</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the compancy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients.map((client, index) => (
                              <SelectItem
                                key={index}
                                value={client.id.toString()}
                              >
                                {client.companyName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>compancy Name</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="">
                <Select onValueChange={handleTemplateChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={templateNames[selectedTemplateNo]}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {templateNames.map((name, index) => (
                      <SelectItem
                        key={index + 1}
                        value={(index + 1).toString()}
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div
              className="min-h-[500px] max-h-[800px] overflow-auto  rounded-lg"
              ref={targetRef}
            >
              <EditorRoot>
                <EditorContent
                  key={selectedTemplateNo}
                  initialContent={editorContent}
                  extensions={extensions}
                  onUpdate={({ editor }) => {
                    // Preserve formatting when updating content
                    const json = editor.getJSON();
                    setEditorContent(json);
                  }}
                  className="min-h-96 rounded-xl border p-4"
                  editorProps={{
                    handleDOMEvents: {
                      keydown: (_view, event) => {
                        // Handle custom keyboard events if needed
                        handleCommandNavigation(event);
                      },
                    },
                    handlePaste: (view, event) =>
                      handleImagePaste(view, event, uploadFn),
                    handleDrop: (view, event, _slice, moved) =>
                      handleImageDrop(view, event, moved, uploadFn),
                    attributes: {
                      class:
                        "prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full whitespace-pre-wrap",
                    },
                  }}
                  slotAfter={<ImageResizer />}
                >
                  <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                    <EditorCommandEmpty className="px-2 text-muted-foreground">
                      No results
                    </EditorCommandEmpty>
                    <EditorCommandList>
                      {suggestionItems.map((item) => (
                        <EditorCommandItem
                          value={item.title}
                          onCommand={(val) => item.command?.(val)}
                          className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                          key={item.title}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </EditorCommandItem>
                      ))}
                    </EditorCommandList>
                  </EditorCommand>

                  <EditorMenu open={openAI} onOpenChange={setOpenAI}>
                    <Separator orientation="vertical" />
                    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                    <Separator orientation="vertical" />
                    <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                    <Separator orientation="vertical" />
                    <MathSelector />
                    <Separator orientation="vertical" />
                    <TextButtons />
                    <Separator orientation="vertical" />
                    <ColorSelector
                      open={openColor}
                      onOpenChange={setOpenColor}
                    />
                  </EditorMenu>
                </EditorContent>
              </EditorRoot>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                <PenTool size={16} />
                Sign
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                <Download size={16} />
                Download PDF
              </button>
              <Button className="" type="submit" disabled={isLoading}>
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
        </form>
      </Form>
    </div>
  );
}
