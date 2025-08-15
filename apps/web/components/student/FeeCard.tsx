import { IFeePayment } from "@repo/types";
import React, { useState } from "react";
import MarkAsPaid from "./MarkAsPaid";
interface PropInf {
  fee: IFeePayment;
  index: number;
  openIndex: number | null;
  onToggle: () => void;
}
const FeeCard: React.FC<PropInf> = ({ fee, index, openIndex, onToggle }) => {
  const [openMark, setOpenMark] = useState(false);

  const handleMarkPaid = (paidAmount: number, date: string) => {
    fee.status = "paid";
    fee.paidAmount = paidAmount;
    fee.paidDate = new Date(date);
  };

  return (
    <div className="bg-white shadow rounded-lg px-4 space-y-2 border border-gray-200">
      <button
        onClick={onToggle}
        className=" py-4 w-full cursor-pointer text-start"
      >
        <h1>{new Date(fee.createdAt).toISOString().split("T")[0]}</h1>
      </button>
      {openIndex === index && (
        <div className=" w-md p-3 border">
          <span>Due amount for this month: {fee.amount} ₹</span>
          <div className=" flex justify-between">
            <span>Status: {fee.status}</span>
            {fee.status !== "paid" ? (
              <button onClick={() => setOpenMark(true)}>Mark as paid</button>
            ) : (
              <div>Marked</div>
            )}
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
              <span>
                Next Reminder:{" "}
                {new Date(fee.nextReminderAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span>
                Last Reminder Count:{" "}
                {new Date(fee.nextReminderAt).toISOString().split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      )}
      {openMark && (
        <MarkAsPaid
          setOpenMark={setOpenMark}
          feeId={String(fee._id)}
          onMarkPaid={handleMarkPaid}
        />
      )}
    </div>
  );
};

export default FeeCard;
