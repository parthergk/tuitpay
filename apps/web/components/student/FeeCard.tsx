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
    <div className=" w-full py-2 px-3 rounded-md bg-gradient-to-bl from-[#E8DFFF]/50 hover:from-[#E8DFFF]/10 to-[#DDEBFF]/50 hover:to-[#DDEBFF]/10 border border-white/50 cursor-pointer">
      <button onClick={onToggle} className=" w-full cursor-pointer text-start">
        <h1>{new Date(fee.createdAt).toISOString().split("T")[0]}</h1>
      </button>
      {openIndex === index && (
        <div className="text-sm sm:text-base md:text-base leading-snug text-[#475569] mt-2 flex flex-col">
          <div className=" flex gap-5">
            <div className="space-y-1.5">
              <p>
                <span className="font-medium text-gray-700">
                  Due amount for this month: {fee.amount} ₹
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Status: {fee.status}...
                </span>
              </p>

              <p>
                <span className="font-medium text-gray-700">Due Date:</span>{" "}
                {fee.dueDate ? new Date(fee.dueDate).toDateString() : "N/N"}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Paid Amount:{" "}
                  {fee.dueDate ? new Date(fee.dueDate).toDateString() : "N/N"}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Paid Date:
                  {fee.paidDate ? new Date(fee.paidDate).toISOString() : "N/N"}
                </span>
              </p>
            </div>
            <div className=" h-36 w-px border border-neutral-400"></div>
            <div className="space-y-1.5">
              <p>
                <span className="font-medium text-gray-700">
                  Reminder Count: {fee.reminderCount}
                </span>
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Next Reminder:{" "}
                  {new Date(fee.nextReminderAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Last Reminder Count:{" "}
                  {new Date(fee.nextReminderAt).toISOString().split("T")[0]}
                </span>
              </p>
            </div>
          </div>
          {fee.status !== "paid" ? (
            <button
              className=" self-end my-2 px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm sm:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
              onClick={() => setOpenMark(true)}
            >
              Mark as paid
            </button>
          ) : (
            <div>Marked</div>
          )}
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
