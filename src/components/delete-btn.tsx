'use client'

import React from "react";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { deleteClient } from "@/actions/client.actions";
import { toast } from "sonner";
import { deleteProject } from "@/actions/project.actions";
import { deletetranscation } from "@/actions/transcation.actions";
import { deleteContract } from "@/actions/contract";
import { deleteInvoice } from "@/actions/invoice.action";

function DeleteMenuItem({ id, action }: { id: number, action: "client" | "project" | "transaction" |"contract"|"invoice" }) {
  const router = useRouter();

  const handleDelete = async () => {
    console.log("id action",id,action);
    try {
      if (action === "client") {
        await deleteClient(id);
       
      } else if (action === "project") {
        await deleteProject(id);
      } else if (action === "transaction") {
        await deletetranscation(id);
      }
      else if (action === "contract") {
        await deleteContract(id);
      }
      else if (action === "invoice") {
        await deleteInvoice(id);
      }

      
      toast.success(`${action} deleted successfully`);
      router.refresh();
    } catch (error) {
      console.error(`Error deleting ${action}:`, error);
      toast.error(`Failed to delete ${action}`);
    }
  };

  return (
    <DropdownMenuItem  className="p-0 text-destructive" onClick={(e) => e.preventDefault()}>
      {/* <p>Delete</p> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-full h-auto p-0 flex justify-between"
          >
            Delete
            <Trash size={15} />
          </Button>
        </AlertDialogTrigger>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {action}
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}

export default DeleteMenuItem;