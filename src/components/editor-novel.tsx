"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/file-uploader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CloudUpload, Download, LoaderCircleIcon, Paperclip, PenTool } from "lucide-react";
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
import { useRouter } from "next/navigation";
import SignatureInput from "./ui/signature-input";

const formSchema = z.object({
  Name: z.string(),
  companyName: z.string().optional(),
  content: z.string().optional(),
  Signature: z.string().optional(),
  Signature_image: z.string().optional()
});

// const hljs = require("highlight.js");
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
  `Freelance Contract Template
  Created by freelancermap.com
  
  
  [Your Name/Business name] <> [Client Company]
  Contractor Agreement
   
  [Freelancer Name] (herein known as “Contractor”) will provide [Client/Brand Name] (herein known as “Client”) with [Insert an overview of work deliverables] as outlined in the specifications listed in the Terms and Conditions below.
  
  Description of the Services
  Freelancer will [insert services provided]
  
  Pricing/Rates
  [Insert prices discussed – include rates for changes and revision work]
  
  Payment Terms/Schedule
  30% up front, the rest upon completion of the project. 
  Payable by check, bank transfer or PayPal. 
  
  Contract in effect beginning:  [Insert Start date]
  
  Terms and Conditions
  
  The following rates and terms apply:
  
  Client will pay the sum of [$X,XXX – mention if it’s per hour, per month or for the entire contract] to Contractor via [Payment method agreed upon] as agreed to by both parties, no later than the [insert final payment date] of the agreed-upon payment schedule, for work delivered and accepted by the Client. 
  
  Contractor will provide the following as per deliverable dates mutually agreed upon:
  
  •	[Insert Deliverable 1 - specifications, and due date] 
  •	[Insert Deliverable 2 - specifications, and due date] 
  •	[Insert Deliverable 3 - specifications, and due date] 
  •	[Insert Deliverable 4 - specifications, and due date] 
  
  
  Scope of Project
  Contractor agrees to perform services until the engagement has ended on the agreed-upon. 
  
  Legal
  
  Contractor declares that they cannot guarantee completed work will be completely error-free, as such they can’t be liable to the Client or any third-party for damages, including lost profits, lost savings or other incidental, consequential or special damages, even with prior advisory. If any provision of this contract shall be unlawful, void, or for any reason is unenforceable, then that provision shall be deemed severable from this contract and shall not affect the validity and enforceability of any remaining provisions.
  
  Copyright
  
  Client will own the copyright for all material created under this agreement, and contractor can showcase sample works from this project as portfolio pieces only with consent and approval from client.
  
  Termination
  This agreement may be terminated with [XX days] written notice by either party. Initial deposit of 30% is non-refundable.
  
  
  
  Client agrees to terms and policies specified above:
   
  Signature: ____________________________
  
  Name & Title: _________________________
  
  Date: _________________________________	
  Accepted by the Contractor:
  
  [Signature Goes Here]
  
  Your Name
  
  Date
  
  `,
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
  // Your second template
  `SERVICE AGREEMENT
This Service Agreement ("Agreement") is made on [Date] by and between:

Client:
[Client's Name]
[Client's Address]

Service Provider:
[Service Provider's Name]
[Service Provider's Address]

Services Provided: The Service Provider agrees to provide the following services to the Client:
[Service 1]
[Service 2]
[Service 3]
Payment Terms: The Client agrees to pay the Service Provider $[Amount] for the services provided. Payment will be made on the following schedule:
[Payment Schedule]
Term: This Agreement will begin on [Start Date] and end on [End Date] unless terminated earlier as provided in this Agreement.
Confidentiality: Both parties agree to keep any confidential information exchanged during the term of this Agreement confidential.
Service Provider's Signature:

[Service Provider's Name]

Client's Signature:

[Client's Name]

RENTAL AGREEMENT
This Rental Agreement ("Agreement") is made on [Date] by and between:

Lessor (Landlord):
[Lessor's Name]
[Lessor's Address]

Lessee (Tenant):
[Lessee's Name]
[Lessee's Address]

Premises: The Lessor agrees to lease to the Lessee the property located at [Property Address] ("Premises").
Term: The rental term shall begin on [Start Date] and end on [End Date].
Rent: The Lessee agrees to pay the Lessor a rent of $[Amount] per [Month/Year], payable on the [Day of the Month].
Security Deposit: A security deposit of $[Amount] is due at the time of signing this Agreement.
Maintenance: The Lessee agrees to maintain the Premises in good condition and to promptly report any damage or need for repairs to the Lessor.
Lessor's Signature:

[Lessor's Name]

Lessee's Signature:

`, // Your third template
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
  const [hasLoadedInitialContent, setHasLoadedInitialContent] = useState(false);
  interface Contract {
    id: number;
    contractName: string;
    clientId: number;
    content: string;
  }

  const [contract, setcontract] = useState<Contract[]>([]);
  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

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
      content: "",
    },
  });

  useEffect(() => {
    const loadExistingContract = async () => {
      if (!editId || hasLoadedInitialContent) {
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
            content: contract.content || "",
          });
          if (contract.content) {
            try {
              const parsedContent = JSON.parse(contract.content);
              setEditorContent(parsedContent);
              setHasLoadedInitialContent(true);
            } catch (error) {
              console.error("Error parsing stored content:", error);
              toast.error("Error loading saved content");
              setEditorContent(initialTemplates[0]);
            }
          }
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
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(typeof values.Signature);
    try {
      const Contractvalues = {
        id: editId ? parseInt(editId as string) : 0,
        contractName: values.Name,
        clientId: values.companyName ? parseInt(values.companyName) : 0,
        userId: userId,
        content: JSON.stringify(editorContent),
      };
      if (editId) {
        await updateContract(Contractvalues);
        router.push("/app/contract");
        toast.success("Contract updated successfully");
      } else {
        await addNewContract(Contractvalues);
        toast.success("Contract created successfully");
        router.push("/app/contract");
      }
      // console.log(values,session?.user?.id);
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
    if (!editId) {
      // Only allow template changes for new contracts
      const templateIndex = Number(value) - 1;
      if (templateIndex >= 0 && templateIndex < initialTemplates.length) {
        setSelectedTemplateNo(templateIndex);
        setEditorContent(initialTemplates[templateIndex]);
      }
    } else {
      toast.info("Template cannot be changed while editing");
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
                  key={`${selectedTemplateNo}-${editId}-${hasLoadedInitialContent}`}
                  initialContent={editorContent}
                  extensions={extensions}
                  onUpdate={({ editor }) => {
                    // Preserve formatting when updating content
                    const json = editor.getJSON();
                    setEditorContent(json);
                    form.setValue("content", JSON.stringify(json));
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
              <Dialog>
                <DialogTrigger className="flex items-center justify-center border px-4 py-2 rounded-md gap-2">
                  <PenTool size={16} />
                  Sign
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Signature</DialogTitle>
                    <div>
                      <FormField
                        control={form.control}
                        name="Signature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Signature</FormLabel>
                            <FormControl>
                              <SignatureInput
                                canvasRef={canvasRef}
                                onSignatureChange={field.onChange}
                              />
                            </FormControl>
                            <FormDescription>Signature</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="Signature_image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Signature_image</FormLabel>
                            <FormControl>
                              <FileUploader
                                value={files}
                                onValueChange={setFiles}
                                dropzoneOptions={dropZoneConfig}
                                className="relative bg-background rounded-lg p-2"
                              >
                                <FileInput
                                  id="fileInput"
                                  className="outline-dashed outline-1 outline-slate-500"
                                >
                                  <div className="flex items-center justify-center flex-col p-8 w-full ">
                                    <CloudUpload className="text-gray-500 w-10 h-10" />
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
                                  {files &&
                                    files.length > 0 &&
                                    files.map((file, i) => (
                                      <FileUploaderItem key={i} index={i}>
                                        <Paperclip className="h-4 w-4 stroke-current" />
                                        <span>{file.name}</span>
                                      </FileUploaderItem>
                                    ))}
                                </FileUploaderContent>
                              </FileUploader>
                            </FormControl>
                            <FormDescription>Signature_image</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

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
