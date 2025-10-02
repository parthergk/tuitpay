import {
  Bell,
  LayoutDashboard,
  List,
  LucideReceiptPoundSterling,
  Users2,
} from "lucide-react";
import React, { useState } from "react";

const RightBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="  h-5 w-5" />,
    },
    {
      name: "Student",
      icon: <Users2 className="  h-5 w-5" />,
    },
    {
      name: "Fee Tracking",
      icon: <List className="  h-5 w-5" />,
    },
    {
      name: "Reminders",
      icon: <Bell className="  h-5 w-5" />,
    },
    {
      name: "Reports",
      icon: <LucideReceiptPoundSterling className="  h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col items-center md:items-start max-w-12 md:max-w-xs w-full h-full rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-3 md:py-6 px-1 md:px-5">
      <ul className=" w-full flex flex-col gap-3 text-sm md:text-base lg:text-lg text-sub">
        {items.map((item, index) => {
          return (
            <li
              key={item.name}
              onClick={() => setActiveIndex(index)}
              className={`w-full px-2 py-1 rounded-md ${index === activeIndex ? "bg-primary text-white": ""} flex gap-3 items-center transition-colors duration-200 ease-out`}
            >
              {item.icon}
              <span className=" hidden md:block">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RightBar;
