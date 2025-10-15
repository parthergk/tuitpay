import React from "react";
interface PropsInf {
  title: string;
  count: string | number;
  color: string;
  textColor?: string;
}
const StatCard: React.FC<PropsInf> = ({ title, count, color, textColor }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center p-4 shadow-2xl shadow-black/10 border border-white/50 rounded-xl ${color}`}
    >
      <h2 className={`text-xs md:text-[13px] lg:text-sm text-sub leading-snug ${textColor}`}>{title}</h2>
      <span
        className={` text-lg sm:text-xl md:text-2xl font-medium truncate text-body ${textColor}`}
      >
        {count}
      </span>
    </div>
  );
};

export default StatCard;
