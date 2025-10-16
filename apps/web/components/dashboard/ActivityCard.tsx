import React from "react";

const ActivityCard = () => {
  const array = [
    { name: "Raj", amount: "paid 2000", date: "05/09/2025" },
    { name: "Kapil", amount: "paid 1200", date: "20/08/2025" },
    { name: "Gaurav", amount: "paid 500", date: "15/08/2025" },
    { name: "Anuj", amount: "paid 2000", date: "30/07/2025" },
  ];
  return (
    <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl">
      {/* header */}
      <h2 className=" border-b pb-2 text-xl text-heading">Recent activity</h2>
      <div className=" my-5 flex flex-col gap-2">
        {array.map((item) => (
          <div className="text-xs md:text-sm lg:text-base leading-snug text-heading">
            <span>{item.name}</span>
            {" "}
            <span>{item.amount}</span>
            <p className=" text-sub text-xs md:text-[13px] lg:text-sm">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
