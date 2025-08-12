import { IFeePayment } from "@repo/types";
import React from "react";
interface PropInf {
  fee: IFeePayment;
  index: number;
  openIndex: number | null;
  onToggle: () => void;
}
const FeeCard: React.FC<PropInf> = ({ fee, index, openIndex, onToggle }) => {
  return (
    <div
      key={index}
      onClick={onToggle}
      className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200 cursor-pointer"
    >
      <h1>{new Date(fee.createdAt).toISOString().split("T")[0]}</h1>
      {openIndex === index && <div className=" w-md h-12 border"></div>}
    </div>
  );
};

export default FeeCard;
