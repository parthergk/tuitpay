import React from "react";

interface Props {
  activity:{
        name: string;
        amount: number;
        paidDate: string;
      }[]
}

const ActivityCard: React.FC<Props> = ({ activity }) => {

  return (
    <div className="flex flex-col px-4 py-2 shadow-lg shadow-black/10 border border-white/50 rounded-xl min-h-[287px]">
      {/* header */}
      <h2 className=" border-b pb-2 text-xl text-heading">Recent activity</h2>
      <div className=" my-5 flex flex-col gap-2">
        {activity?.length > 0 ? activity.map((item) => (
          <div
            key={item.name}
            className="text-xs md:text-sm lg:text-base leading-snug text-heading"
          >
            <div className=" flex justify-between items-center">
            <span>{item.name}</span> <span className=" text-sub ">{item.amount}{" "}Paid</span>
            </div>
            <p className=" text-sub text-xs md:text-[13px] lg:text-sm">
              {item.paidDate}
            </p>
          </div>
        )):<div className=" text-center text-sub text-lg">No reacent activity</div>}
      </div>
    </div>
  );
};

export default ActivityCard;
