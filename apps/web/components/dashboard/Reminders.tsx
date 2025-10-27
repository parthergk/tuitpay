import React from "react";
import { useOverDue } from "../../context/OverDueProvider";

const Reminders = () => {
  const { overDues } = useOverDue();
  console.log("Over dues", overDues);

  return (
    <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl min-h-[287px]">
      <h2 className=" border-b pb-2 text-xl text-heading">Overdue Payments</h2>
      <div className=" my-5 flex flex-col gap-2">
        {overDues.length > 0 &&
          overDues.map((student) => (
            <div
              key={student.name}
              className=" flex justify-between items-center"
            >
              <div className="text-[13px] md:text-sm lg:text-base leading-snug text-heading">
                <span>{student.name}</span>
                <div className=" space-x-2 text-sub text-xs md:text-[13px] lg:text-sm">
                  <span>₹{student.amount}</span>
                  <span>{student.daysOverdue} days overdue</span>
                </div>

              </div>
              <button className=" bg-primary text-white text-center px-2 py-0.5 rounded-md">Send Reminder</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reminders;
