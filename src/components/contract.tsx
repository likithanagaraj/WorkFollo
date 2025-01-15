"use client";

import "../styles/tiptap.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useRef, useState } from "react";
import generatePDF, { usePDF } from "react-to-pdf";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MarkdownSerializer,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { Download, PenTool, Send } from "lucide-react";
import SignatureInput from "./ui/signature-input";

const initialTemplates = [
  `<h1>Business Contract</h1>
    <p>This contract is entered into between the following parties:</p>

    <p><strong>Party 1:</strong> [Party Name], located at [Address]</p>
    <p><strong>Party 2:</strong> [Party Name], located at [Address]</p>

    <h2>1. Agreement Overview</h2>
    <p>This agreement sets forth the terms under which the parties agree to [describe the business agreement].</p>

    <h2>2. Terms and Conditions</h2>
    <ul>
        <li>Both parties agree to [term or condition].</li>
        <li>Party 1 will provide [goods/services] in exchange for [payment].</li>
    </ul>

    <h2>3. Payment Terms</h2>
    <p>The payment of [amount] will be made by Party 2 to Party 1 on [date or milestone].</p>

    <h2>4. Termination Clause</h2>
    <p>Either party may terminate this contract with written notice of [time period].</p>

    <h2>5. Signatures</h2>
    <p>By signing below, both parties acknowledge and agree to the terms set forth in this contract.</p>


    <p>Date: ______________________</p>`,
  ` <h1>Freelance Contract</h1>
    <p>This contract is entered into between the following parties:</p>

    <p><strong>Freelancer:</strong> [Freelancer Name], located at [Address]</p>
    <p><strong>Client:</strong> [Client Name], located at [Address]</p>

    <h2>1. Scope of Work</h2>
    <p>The freelancer agrees to provide the following services: [describe services].</p>

    <h2>2. Payment Terms</h2>
    <p>The client agrees to pay the freelancer [amount] upon completion of the project or on agreed milestones.</p>

    <h2>3. Delivery Timeline</h2>
    <p>The freelancer agrees to complete the work by [date].</p>

    <h2>4. Confidentiality</h2>
    <p>Both parties agree to keep all project-related information confidential.</p>

    <h2>5. Termination</h2>
    <p>Either party may terminate the contract by giving [notice period] notice in writing.</p>

    <h2>6. Signatures</h2>
    <p>By signing below, both parties agree to the terms of this freelance contract.</p>
    <p><strong>Freelancer Signature:</strong> ______________________</p>
    <p><strong>Client Signature:</strong> ______________________</p>

    <p>Date: ______________________</p>`,
  ` <h1>E-commerce Contract</h1>
    <p>This contract is entered into between the following parties:</p>

    <p><strong>Seller:</strong> [Seller Name], located at [Address]</p>
    <p><strong>Buyer:</strong> [Buyer Name], located at [Address]</p>

    <h2>1. Product Details</h2>
    <p>The seller agrees to sell the following product(s) to the buyer: [list of products].</p>

    <h2>2. Price and Payment</h2>
    <p>The total price for the products is [amount]. The buyer agrees to pay via [payment method].</p>

    <h2>3. Delivery and Shipping</h2>
    <p>The seller agrees to ship the product(s) within [time frame] after receiving payment. Delivery will be made to [address].</p>

    <h2>4. Returns and Refunds</h2>
    <p>The buyer may request a return or refund within [time frame] from the date of delivery, subject to [conditions].</p>

    <h2>5. Dispute Resolution</h2>
    <p>Any disputes arising from this agreement will be resolved through [method, e.g., arbitration or mediation].</p>

    <h2>6. Signatures</h2>
    <p>By signing below, both parties agree to the terms and conditions of this e-commerce contract.</p>
    <p><strong>Seller Signature:</strong> ______________________</p>
    <p><strong>Buyer Signature:</strong> ______________________</p>

    <p>Date: ______________________</p>`,
];

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
];

// // Add custom markdown handling for bold
// const customMarkdownSerializer = {
//   ...defaultMarkdownSerializer,
//   marks: {
//     ...defaultMarkdownSerializer.marks,
//     bold: {
//       open: '**',
//       close: '**',
//       mixable: true,
//       expelEnclosingWhitespace: true,
//     },
//     italic: {
//       open: '_',
//       close: '_',
//       mixable: true,
//       expelEnclosingWhitespace: true,
//     },
//     // You can also add other marks (like italic, etc.) if needed
//   },
// };

const MenuBar = ({
  setMarkdown,
}: {
  setMarkdown: (markdown: string) => void;
}) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  // const convertToMarkdown = () => {
  //   const json = editor.getJSON();
  //   const serializer = new MarkdownSerializer(
  //     customMarkdownSerializer.nodes,
  //     customMarkdownSerializer.marks
  //   );
  //   const markdown = serializer.serialize(editor.schema.nodeFromJSON(json));
  //   setMarkdown(markdown);
  // };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
      >
        Undo
      </button>
      <button
        onClick={() => editor.commands.clearContent()}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
      >
        Clear
      </button>
      {/* <button 
        onClick={convertToMarkdown}
        className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
      >
        Convert to Markdown
      </button> */}
    </div>
  );
};

export default function ContarctTemplate() {
  const [selectedTemplateNo, setSelectedTemplateNo] = useState(0);
  const templateNames = ["Template 1", "Template 2", "Template 3"];
  const [markdown, setMarkdown] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className="container mx-auto px-2 py-8 max-w-6xl">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="">Contract </h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
              <PenTool size={16} />
              Sign
            </button>
            <button
              onClick={() => toPDF()}
              className="flex items-center gap-2 px-4 py-2 border rounded-md"
            >
              <Download size={16} />
              DownloadPDF
            </button>

            <Select onValueChange={(e) => setSelectedTemplateNo(Number(e) - 1)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={templateNames[selectedTemplateNo]} />
              </SelectTrigger>
              <SelectContent>
                {templateNames.map((name, index) => (
                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-lg shadow-sm">
          <div className=" min-h-[600px] max-h-[800px] overflow-auto p-6">
            <div ref={targetRef}>
              <EditorProvider 
                key={selectedTemplateNo}
                slotBefore={<MenuBar setMarkdown={setMarkdown} />}
                extensions={extensions}
                content={initialTemplates[selectedTemplateNo]}
              />
              <SignatureInput
                canvasRef={canvasRef}
                onSignatureChange={(signature) => {
                  console.log("Signature changed:", signature);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
