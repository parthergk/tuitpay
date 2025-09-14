import React from "react";
interface PropsInf {
  title: string;
  count: number | undefined;
  color: string;
  textColor?: string;
}
const StatCard: React.FC<PropsInf> = ({ title, count, color, textColor }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center p-4 shadow-2xl shadow-black/10 border border-white/50 rounded-xl ${color}`}
    >
      <h2 className={`text-xs md:text-[13px] lg:text-sm text-[#4B5563] leading-snug ${textColor}`}>{title}</h2>
      <span
        className={` text-lg sm:text-xl md:text-2xl font-medium truncate text-[#1A1A1A] ${textColor}`}
      >
        {count}
      </span>
    </div>
  );
};

export default StatCard;
