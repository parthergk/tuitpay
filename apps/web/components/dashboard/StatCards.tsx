import React from "react";
interface PropsInf{
  title: string;
  count: number | undefined;
  color: string
  textColor: string
}
const StatCard:React.FC<PropsInf> = ({ title, count, color, textColor }) => {
  return (
    <div className={`flex flex-col justify-center items-center p-4 rounded-lg shadow-md ${color}`}>
      <h2 className={`text-sm font-medium ${textColor}`}>{title}</h2>
      <span className={`text-xl font-bold ${textColor}`}>{count}</span>
    </div>
  );
};

export default StatCard;
