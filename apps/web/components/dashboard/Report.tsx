import React from "react";
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

const Report = () => {
  const reportData = {
    summaryStats: {
      thisMonthCollection: 4800,
      totalRevenue: 45200,
      activeStudents: 10,
      pendingOutstanding: 2400,
    },
    monthlyRevenue: [
      { month: "June", collected: 6200 },
      { month: "July", collected: 7400 },
      { month: "August", collected: 8200 },
      { month: "September", collected: 7200 },
      { month: "October", collected: 4800 },
    ],
  };

  return (
    <div className=" w-full">
      <div className="flex flex-col py-2">
        <h2 className="border-b pb-2 text-xl text-heading">
          Total Collection Report
        </h2>
        <CollectionCard summaryStats={reportData.summaryStats} />
      </div>
        <ResponsiveContainer  className="text-xs md:text-sm lg:text-base leading-snug" width="100%" height={200}>
          <LineChart
            data={reportData.monthlyRevenue}
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
