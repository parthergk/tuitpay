import React from "react";
import { useOpenPlan } from "../../../context/OpenPlanProvider";
import { useSession } from "next-auth/react";

interface Props {
  planInfo: {
    planType: string;
    planStatus: string;
    studentLimit: number;
    planActivatedAt: string;
    planExpiresAt: string;
  };
}

const PlanInfo: React.FC<Props> = ({ planInfo }) => {
  const session = useSession();
  const { setIsOpenPlans } = useOpenPlan();
  return (
    <div className="flex flex-col w-full h-full md:max-w-sm mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-heading">
        Your Plan
      </h1>
      <div className=" flex flex-col gap-3 mt-3 px-2 text-sm sm:text-base leading-snug text-[#334155] mb-1">
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Plan Type</span>{" "}
          {planInfo.planType}
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Status</span>
          <span className=" bg-primary text-white px-2 rounded-lg">
            {planInfo.planStatus}
          </span>
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Student Limit</span>{" "}
          {planInfo.studentLimit ? planInfo.studentLimit : "unlimited"}
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Activeted</span>{" "}
          {new Date(planInfo.planActivatedAt).toDateString()}
        </p>
        <p className=" flex justify-between">
          <span className="font-medium text-heading">Expires</span>
          {planInfo.planExpiresAt
            ? new Date(planInfo.planExpiresAt).toDateString()
            : "Lifetime (no expiry)"}
        </p>
      </div>
      <button
        type="submit"
        disabled={planInfo.planType === "pro"}
        onClick={() => setIsOpenPlans((pre) => !pre)}
        className={`w-full mt-5 py-2 rounded-md font-medium transition-colors ${
          planInfo.planType === "pro" ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
          }`}
      >
        Upgrade
      </button>
    </div>
  );
};

export default PlanInfo;
