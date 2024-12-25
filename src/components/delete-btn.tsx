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

import { deleteClient } from "@/actions/client.actions";
import { toast } from "sonner";
import { deleteProject } from "@/actions/project.actions";
import { deletetranscation } from "@/actions/transcation.actions";

function DeleteBtn({ id,action }: { id: number,action:"client"|"project"|"transaction" }) {	
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if(action === "client"){
        await deleteClient(id);
      }
      if(action === "project"){
        await deleteProject(id);
      }
      if(action === "transaction"){
        await deletetranscation(id);
      }
      toast("success");
      router.refresh(); // Refresh the current route to update the UI
    } catch (error) {
      console.error("Error deleting client:", error);
      toast("error");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the client
            and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBtn;

