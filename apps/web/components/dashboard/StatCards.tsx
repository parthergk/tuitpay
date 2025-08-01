import React from "react";

const StatCard = ({ title, count, bgColor = "bg-white", textColor = "text-black" }) => {
  return (
    <div className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md ${bgColor}`}>
      <h2 className={`text-sm font-medium ${textColor}`}>{title}</h2>
      <span className={`text-xl font-bold ${textColor}`}>{count}</span>
    </div>
  );
};

export default StatCard;
