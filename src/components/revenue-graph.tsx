"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Transaction } from "@prisma/client"

// Define the Transaction type based on your Prisma model


// Define the chart data structure
interface ChartDataPoint {
  date: string
  revenue: number
  expenses: number
}

// Chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Function to transform transactions into chart data
function transformTransactionsToChartData(transactions: Transaction[]): ChartDataPoint[] {
  // Group transactions by date
  const groupedByDate = transactions.reduce(
    (acc, transaction) => {
      const dateStr = transaction.date.toISOString().split("T")[0]

      if (!acc[dateStr]) {
        acc[dateStr] = {
          revenue: 0,
          expenses: 0,
        }
      }

      if (transaction.type === "income") {
        acc[dateStr].revenue += transaction.amount
      } else if (transaction.type === "expense") {
        acc[dateStr].expenses += transaction.amount
      }

      return acc
    },
    {} as Record<string, { revenue: number; expenses: number }>,
  )

  // Convert to array format needed for the chart
  return Object.entries(groupedByDate)
    .map(([date, values]) => ({
      date,
      revenue: values.revenue,
      expenses: values.expenses,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export default function RevenueGraph({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [showExpenses, setShowExpenses] = React.useState(true)

  // Transform transactions to chart data
  const chartData = React.useMemo(() => transformTransactionsToChartData(transactions), [transactions])

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    const now = new Date()
    let daysToSubtract = 90

    if (timeRange === "360d") daysToSubtract = 360
    else if (timeRange === "180d") daysToSubtract = 180
    else if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return chartData.filter((item) => new Date(item.date) >= startDate)
  }, [chartData, timeRange])

  return (
    <Card className="p-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Revenue</CardTitle>
          <CardDescription>The total money earned vs expenses</CardDescription>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select time range">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="360d" className="rounded-lg">
                Last year
              </SelectItem>
              <SelectItem value="180d" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Switch checked={showExpenses} onCheckedChange={setShowExpenses} id="show-expenses" />
            <label htmlFor="show-expenses" className="text-sm">
              Show Expenses
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value, name) => {
                    return [`$${value}`, chartConfig[name as keyof typeof chartConfig]?.label || name]
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="revenue" type="natural" fill="url(#fillRevenue)" stroke="var(--color-revenue)" stackId="a" />
            {showExpenses && (
              <Area
                dataKey="expenses"
                type="natural"
                fill="url(#fillExpenses)"
                stroke="var(--color-expenses)"
                stackId="a"
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

