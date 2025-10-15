import {
  Bell,
  LayoutDashboard,
  List,
  LogOut,
  LucideReceiptPoundSterling,
  Users2,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const RightBar = ({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
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
    <div className={` ${isOpen?"absolute": " hidden md:flex"} top-0 left-0 z-10 flex flex-col justify-between items-start md:max-w-72 w-full h-full rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-6 px-5`}>
      <div className=" w-full">
        <div className=" flex justify-between items-center">
          <X size={28} className=" md:hidden" onClick={()=>setIsOpen(false)} />
          <h2 className="text-lg tracking-widest">FEEXY</h2>
        </div>

        <ul className=" w-full mt-12 md:mt-5 flex flex-col gap-5 md:gap-3 text-lg text-sub">
          {items.map((item, index) => {
            return (
              <li
                key={item.name}
                onClick={() => setActiveIndex(index)}
                className={`w-full px-2 py-1 rounded-md ${index === activeIndex ? "bg-primary text-white" : ""} flex gap-3 items-center transition-colors duration-200 ease-out`}
              >
                {item.icon}
                <span className="block">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => signOut()}
        className=" text-sub flex justify-center items-center gap-2 px-2 cursor-pointer py-1"
      >
        <LogOut className=" h-5 w-5" /> Logout
      </button>
    </div>
  );
};

export default RightBar;
