"use server"

import prisma from "@/lib/db"

interface contractSchema{
  id : number;
  contractName : string;
  clientId : number;
  userId:number,
  content:string
}

export async function addNewContract(data:contractSchema){
const createContract = await prisma.contract.create({
  data:{
    contractName:data.contractName,
    clientId:data.clientId,
    userId:data.userId,
    content:data.content
  }
})
}


export async function getContract(id:number){
const contract = await prisma.contract.findUnique({
  where:{
    id:id
  },
  include:{
    Client:true,
  }
  
})
return contract
}



export async function updateContract(data:contractSchema){
  const updatecontract = await prisma.contract.updateMany({
    where:{
      id:data.id
    },
    data:{
      contractName:data.contractName,
      clientId:data.clientId,
      userId:data.userId,
      content:data.content
    }
  })
  return updatecontract

}


export async function deleteContract(id:number){
  if (!id) {
    throw new Error("Invalid ID provided for deletion");
  }
  try {
    await prisma.contract.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting contract:", error);
    throw new Error("Failed to delete contract");
  }
}