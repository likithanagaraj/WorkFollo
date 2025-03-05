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
import OnboardingDialog from "@/components/onboarding-dialog";
import { SearchParams } from "@/types";

const Page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const onboarding = searchParams.onboarding;
  const session = await auth()



  const transactions = await prisma.transaction.findMany({
    where: {
      userId: Number(session?.user?.id),
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

  const transaction = await prisma.transaction.findMany({
    include: {
      Client: true,
      Project: true,
    },
    where: {
      userId: Number(session?.user?.id),
    }
  });
  const total = transaction.reduce(
    (acc, transaction) =>
      acc + (transaction.type === "Payments" ? transaction.amount : 0),
    0
  );
  console.log(total)
  const expenses = transaction.reduce((acc, transaction) => {
    if (transaction.type === "Expenses") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  const revenue = total - expenses;

  return (
    <div className="container mx-auto">
      {onboarding == "true" && <OnboardingDialog />}
      <main className="py-7 px-4 sm:px-10 space-y-4">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <h2 className="my-first-step">Your Total Revenue</h2>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <DashboardEachChart
              className="first-feature"
              title="Income"
              amount={`${total.toFixed(0)}`}
              tooltip="Total income from all projects"
            />
            <DashboardEachChart
              className="second-feature"
              title="Expenses"
              amount={`${expenses.toFixed(0)}`}
            />
            <DashboardEachChart
              className="third-feature"
              title="Monthly Revenue"
              amount={`${revenue.toFixed(0)}`}
            />
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 gap-3 fourth-feature">
            {/* @ts-ignore */}
            <RevenueGraph transactions={transactions} />            {/* <ProjectTackerGraph /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
