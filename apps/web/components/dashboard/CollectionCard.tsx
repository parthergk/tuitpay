import React from "react";

interface Props {
  summaryStats: {
    thisMonthCollection: number;
    totalRevenue: number;
    activeStudents: number;
    pendingOutstanding: number;
  };
}
const CollectionCard: React.FC<Props> = ({ summaryStats }) => {
  return (
    <div className=" my-5 flex flex-col gap-2 text-xs md:text-sm lg:text-base leading-snug text-heading">
      <div className=" flex justify-between items-center border-b border-neutral-300 pb-2">
        <span>Active Students</span>
        <span>{summaryStats.activeStudents}</span>
      </div>
      <div className=" flex justify-between items-center border-b border-neutral-300 pb-2">
        <span>This month collection</span>
        <span className=" text-green-700">
          ₹{summaryStats.thisMonthCollection}
        </span>
      </div>
      <div className=" flex justify-between items-center border-b border-neutral-300 pb-2">
        <span>Total Revenue</span>
        <span>₹{summaryStats.totalRevenue}</span>
      </div>
      <div className=" flex justify-between items-center border-b border-neutral-300 pb-2">
        <span>Pending/Outstanding</span>
        <span className=" text-red-500">
          ₹{summaryStats.pendingOutstanding}
        </span>
      </div>
    </div>
  );
};

export default CollectionCard;
