import React from "react";
import CollectionCard from "./CollectionCard";

const Report = () => {
  const reportData = {
    summaryStats: {
      thisMonthCollection: 4800,
      totalRevenue: 45200,
      activeStudents: 10,
      pendingOutstanding: 2400,
    },
    summary: [
      { thisMonthCollection: 4800 },
      { totalRevenue: 45200 },
      { activeStudents: 10 },
      { pendingOutstanding: 2400 },
    ],
    monthlyRevenue: [
      { month: "June", collected: 6200 },
      { month: "July", collected: 7400 },
      { month: "August", collected: 8200 },
      { month: "September", collected: 7200 },
      { month: "October", collected: 4800 },
    ],
  };
  return (
    <>
      <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl min-h-[250px]">
        {/* header */}
        <h2 className=" border-b pb-2 text-xl text-heading">
          Total Collection Report
        </h2>
        <CollectionCard summaryStats={reportData.summaryStats}/>
      </div>
    </>
  );
};

export default Report;
