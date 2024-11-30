import { Client, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Client[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto w-full  py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
