import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TransactionChartRawData {
  date: Date;
  amount: number;
}

export interface TransactionChartTransformedData {
  date: string;
  revenue: number;
}

export function transformChartData(
  rawData: TransactionChartRawData[]
): TransactionChartTransformedData[] {
  // Create a map to store aggregated amounts for each month
  const monthlyTotals = new Map<string, number>();

  // First, aggregate all amounts by month
  rawData.forEach((item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-01`;

    const currentTotal = monthlyTotals.get(monthKey) || 0;
    monthlyTotals.set(monthKey, currentTotal + item.amount);
  });

  // Get the year from the first data point, or use current year if no data
  const year =
    rawData.length > 0
      ? new Date(rawData[0].date).getFullYear()
      : new Date().getFullYear();

  // Create array with all months
  const result: TransactionChartTransformedData[] = [];

  for (let month = 0; month < 12; month++) {
    // Create date string in format YYYY-MM-DD
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      month + 1
    ).padStart(2, "0")}`;

    // Get the total for this month, or 0 if no data
    const revenue =
      monthlyTotals.get(`${year}-${String(month + 1).padStart(2, "0")}-01`) ||
      0;

    result.push({
      date: monthKey,
      revenue: revenue,
    });
  }

  return result;
}

// Example usage:
// const chartData1 = [
//   { date: new Date('2024-08-16T21:32:00.000Z'), amount: 8000 },
//   // Add more data points as needed
// ];

// const transformedData = transformChartData(chartData1);
// console.log(transformedData);
