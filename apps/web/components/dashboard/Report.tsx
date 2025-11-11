import React, { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FeeRecord {
  amount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate: string | null;
}

interface SummaryStats {
  totalRevenue: number;
  pendingOutstanding: number;
  thisMonthCollection: number;
}

interface MonthlyRevenue {
  month: string;
  collected: number;
}

interface ReportData {
  summaryStats: SummaryStats;
  monthlyRevenue: MonthlyRevenue[];
}

const Report: React.FC = () => {
  const [report, setReport] = useState<ReportData>({
    summaryStats: {
      totalRevenue: 0,
      pendingOutstanding: 0,
      thisMonthCollection: 0,
    },
    monthlyRevenue: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecord = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/dashboard/feeRecord`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: {
        success: boolean;
        data: FeeRecord[];
      } = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid API response format");
      }

      const totalRevenue = result.data.reduce(
        (acc, r) => acc + (r.paidAmount || 0),
        0
      );

      const pendingOutstanding = result.data.reduce(
        (acc, r) =>
          r.status === "pending" || r.status === "overdue"
            ? acc + (r.amount || 0)
            : acc,
        0
      );

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const thisMonthCollection = result.data.reduce((acc, r) => {
        if (!r.paidDate) return acc;
        const paidDate = new Date(r.paidDate);
        if (
          currentMonth === paidDate.getMonth() &&
          currentYear === paidDate.getFullYear()
        ) {
          return acc + (r.paidAmount || 0);
        }
        return acc;
      }, 0);

      const monthMap = new Map<string, number>();
      result.data.forEach((r) => {
        if (!r.paidDate) return;
        const monthName = new Date(r.paidDate).toLocaleString("default", {
          month: "long",
        });
        if (r.paidAmount) {
          monthMap.set(
            monthName,
            (monthMap.get(monthName) || 0) + (r.paidAmount || 0)
          );
        }
      });

      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const monthlyRevenue: MonthlyRevenue[] = Array.from(monthMap.entries())
        .sort(([a], [b]) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
        .map(([month, collected]) => ({ month, collected }));

      setReport({
        summaryStats: {
          totalRevenue,
          pendingOutstanding,
          thisMonthCollection,
        },
        monthlyRevenue,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching fee records:", err);
        setError(err.message);
      } else {
        console.error("Unknown error:", err);
        setError("Something went wrong while fetching records");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-slate-600 animate-pulse">
        Loading fee records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 text-[#E53935]">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col py-2">
        <h2 className="border-b pb-2 text-xl text-heading">
          Total Collection Report
        </h2>
        <CollectionCard summaryStats={report.summaryStats} />
      </div>
      <ResponsiveContainer
        className="text-xs md:text-sm lg:text-base leading-snug"
        width="100%"
        height={200}
      >
        <LineChart
          data={report.monthlyRevenue}
          margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="collected"
            stroke="#F97316"
            strokeWidth={1}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;
