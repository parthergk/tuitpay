import React, { useState } from "react";
import { useOverDue } from "../../context/OverDueProvider";

const Reminders = () => {
  const { overDues } = useOverDue();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSendOverdue(id: string) {
    try {
      setLoadingId(id);
      setMessage(null);

      const response = await fetch(
        `http://localhost:8080/api/v1/overdue/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send reminder");
      }

      setMessage({ type: "success", text: result.message });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl min-h-[287px]">
      <h2 className="border-b pb-2 text-xl text-heading">Overdue Payments</h2>

      {message && (
        <div
          className={`mt-2 text-sm rounded-md p-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="my-5 flex flex-col gap-2">
        {overDues.length > 0 ? (
          overDues.map((student) => (
            <div key={student.id} className="flex justify-between items-center">
              <div className="text-[13px] md:text-sm lg:text-base leading-snug text-heading">
                <span>{student.name}</span>
                <div className="space-x-2 text-sub text-xs md:text-[13px] lg:text-sm">
                  <span>₹{student.amount}</span>
                  <span>{student.daysOverdue} days overdue</span>
                </div>
              </div>

              <button
                onClick={() => handleSendOverdue(student.id)}
                disabled={loadingId === student.id}
                className={`${
                  loadingId === student.id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                } text-white text-center px-2 py-0.5 rounded-md`}
              >
                {loadingId === student.id ? "Sending..." : "Send Reminder"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-sub mt-4">No overdue payments 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Reminders;
