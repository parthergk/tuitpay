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

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const RightBar: React.FC<Props> = ({ isOpen, setIsOpen, setSection }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      name: "dashboard",
      icon: <LayoutDashboard className="  h-5 w-5 " />,
    },
    {
      name: "students",
      icon: <Users2 className="  h-5 w-5" />,
    },
    {
      name: "fee Tracking",
      icon: <List className="  h-5 w-5" />,
    },
    {
      name: "reminder",
      icon: <Bell className="  h-5 w-5" />,
    },
    {
      name: "report",
      icon: <LucideReceiptPoundSterling className="  h-5 w-5" />,
    },
  ];

  return (
    <div
      className={` ${isOpen ? "absolute" : " hidden md:flex"} top-0 left-0 z-10 flex flex-col justify-between items-start md:max-w-24 lg:max-w-72 w-full h-screen sm:h-full rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-6 px-5`}
    >
      <div className=" w-full">
        <div className=" flex justify-between items-center">
          <X
            size={28}
            className=" md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <h2 className="text-lg tracking-widest">SMRITYA</h2>
        </div>

        <ul className=" w-full mt-12 md:mt-5 flex flex-col gap-5 md:gap-3 text-lg text-sub">
          {items.map((item, index) => {
            return (
              <li
                key={item.name}
                onClick={() => {
                  setActiveIndex(index);
                  setSection(item.name);
                  setIsOpen(false);
                }}
                className={`w-full px-2 py-1 rounded-md ${index === activeIndex ? "bg-primary text-white" : ""} flex gap-3 items-center transition-colors duration-200 ease-out cursor-pointer`}
              >
                {item.icon}
                <span className="block md:hidden lg:block">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => signOut()}
        className=" text-sub flex justify-center items-center gap-2 px-2 cursor-pointer py-1"
      >
        <LogOut className=" h-5 w-5" />{" "}
        <span className="block md:hidden lg:block">Logout</span>
      </button>
    </div>
  );
};

export default RightBar;
