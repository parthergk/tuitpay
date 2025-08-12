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
      onClick={onToggle}
      className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200 cursor-pointer"
    >
      <h1>{new Date(fee.createdAt).toISOString().split("T")[0]}</h1>
      {openIndex === index && (
        <div className=" w-md p-3 border">
          <span>Due amount for this month: {fee.amount} ₹</span>
          <div>
            <span>Status: {fee.status}</span>
          </div>
          <div>
            <span>
              Due Date:{" "}
              {fee.dueDate ? new Date(fee.dueDate).toDateString() : "N/N"}
            </span>
          </div>
          <div>
            <span>Paid Amount: {fee.paidAmount ? fee.paidAmount : "N/N"}</span>
          </div>
          <div>
            <span>
              Paid Date:{" "}
              {fee.paidDate ? new Date(fee.paidDate).toISOString() : "N/N"}
            </span>
          </div>
          <div>
            <div>
              <span>Reminder Count: {fee.reminderCount}</span>
            </div>
            <div>
              <span>Next Reminder: {new Date(fee.nextReminderAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span>Last Reminder Count: {new Date(fee.nextReminderAt).toISOString().split("T")[0]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeCard;
