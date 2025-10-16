import React from "react";

const Upcoming = () => {
  const array = [
    { name: "Raj Sharma", amount: "2000", date: "15" },
    { name: "Kapil Dev", amount: "1200", date: "20" },
    { name: "Gaurav Kumar", amount: "500", date: "6" },

  ];
  return (
    <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl">
      {/* header */}
      <h2 className=" border-b pb-2 text-xl text-heading">Upcoming Due Dates</h2>
      <div className=" my-5 flex flex-col gap-2">
        {array.map((item) => (
          <div className=" flex justify-between items-center">
            <div className="text-[13px] md:text-sm lg:text-base leading-snug text-heading">
              <span>{item.name}</span>
              <p className=" text-sub text-xs md:text-[13px] lg:text-sm">
                {item.amount}
              </p>
            </div>
            <div className=" border rounded-2xl px-2 border-primary text-primary">{item.date} days overdue</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Upcoming;
