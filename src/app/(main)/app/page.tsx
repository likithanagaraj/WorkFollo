import DashboardEachChart from "@/components/dashboard-chart-card";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RevenueGraph from "@/components/revenue-graph";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { transformChartData } from "@/lib/utils";

const Page = async () => {
  // const session = await auth()
  // const projects = await prisma.project.findMany({
  //   include: {
  //     Client: true,
  //     Transaction: true,
  //   },
  //   where: {
  //     clientId: Number(session?.user?.id),
  //   },
  // });


  const transactions = await prisma.transaction.findMany({
    where: {
      // clientId: Number(session?.user?.id),
      // date: {
      //   gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // 2023
      //   lte: new Date(), // 2024
      // },
    },
    select: {
      date: true,
      amount: true,
    },
  });
  const chartData = transformChartData(transactions);

  // console.log("chartData1", chartData);
  //


  const transaction = await prisma.transaction.findMany({
    include: {
      Client: true,
      Project: true,
    },
  });
  const total = transaction.reduce(
    (acc, transaction) => acc + (transaction.type === "Payments" ? transaction.amount : 0),
    0
  );
  const expenses = transaction.reduce((acc, transaction) => {
    if (transaction.type === "Expenses") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const revenue = total - expenses;
 
  return (
    <div className="container mx-auto">
      <main className="py-7 px-4 sm:px-10 space-y-8">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <h2>Your Total Revenue</h2>

          {/* Revenue and Select Dropdown */}
          {/* <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-0">
            <h2 className="text-3xl font-medium">${total}</h2>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] rounded-[4px]">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Periods</SelectLabel>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section> */}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-3">
          {/* Chart Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardEachChart title="Income" amount={`${total}`} />
            <DashboardEachChart title="Expenses" amount={`${expenses}`} />
            <DashboardEachChart title="Monthly Revenue" amount={`${revenue}`} />
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 gap-3">
            <RevenueGraph  chartData={chartData}/>
            {/* <ProjectTackerGraph /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
