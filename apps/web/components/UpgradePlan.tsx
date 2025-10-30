import React from "react";
import { useOpenPlan } from "../context/OpenPlanProvider";
import { X } from "lucide-react";
import Plans from "./Plans";

const UpgradePlan = () => {
  const { isOpenPlans, setIsOpenPlans } = useOpenPlan();
  return (
    <>
      {isOpenPlans && (
        <div className="fixed h-full w-full inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-3xl rounded-lg">
          <div className=" h-full w-full m-auto p-3 flex flex-col bg-gradient-to-bl from-[#E8DFFF] to-[#DDEBFF] border-l border-white/50 shadow-xl shadow-black/10 rounded-lg">
            <div className=" w-full flex justify-between items-center">
              <h1 className="text-[28px] sm:text-4xl text-heading">
                Upgrade Your Plan
              </h1>
              <button
                onClick={() => setIsOpenPlans((pre) => !pre)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X />
              </button>
            </div>
            <Plans />
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradePlan;
