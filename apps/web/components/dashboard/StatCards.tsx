import React from "react";
interface PropsInf{
  title: string;
  count: number | undefined;
  color: string
  textColor: string
}
const StatCard:React.FC<PropsInf> = ({ title, count, color, textColor }) => {
  return (
    <div className={`flex flex-col justify-center items-center p-4 shadow-2xl shadow-black/10 border border-white/50 rounded-xl ${color}`}>
      <h2 className={`text-sm sm:text-base leading-snug ${textColor}`}>{title}</h2>
      <span className={` text-base sm:text-lg md:text-xl font-medium truncate ${textColor}`}>{count}</span>
    </div>
  );
};

export default StatCard;
