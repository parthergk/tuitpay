import React from "react";
import { useOpenPlan } from "../../../context/OpenPlanProvider";

const PlanInfo = () => {
  const { setIsOpenPlans } = useOpenPlan();
  return (
    <div className="flex flex-col w-full h-full max-w-sm mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-heading">
        Your Plan
      </h1>
      <div className=" flex flex-col gap-3 mt-3 px-2 text-sm sm:text-base leading-snug text-[#334155] mb-1">
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Plan Type</span> {"pro"}
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Status</span>{" "}
          <span className=" bg-primary text-white px-2 rounded-lg">Active</span>
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Student Limit</span> 100
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Activeted</span> Oct, 1,
          2025
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Expires</span> Nov, 1, 2025
        </p>
      </div>
      <button
        type="submit"
        onClick={() => setIsOpenPlans((pre) => !pre)}
        className="w-full mt-5 py-2 rounded-md font-medium transition-colors bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
      >
        Upgrade
      </button>
    </div>
  );
};

export default PlanInfo;
