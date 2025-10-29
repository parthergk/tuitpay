"use client";
import React, { useEffect, useState } from "react";
import Password from "../../../components/dashboard/profile/Password";
import PersonalInfoCard from "../../../components/dashboard/profile/PersonalInfoCard";
import PlanInfo from "../../../components/dashboard/profile/PlanInfo";
import { useOpenPlan } from "../../../context/OpenPlanProvider";
import { X } from "lucide-react";
import Plans from "../../../components/Plans";

const Profile = () => {
  const {isOpenPlans, setIsOpenPlans} = useOpenPlan();
  async function fetchTeacher() {
    const response = await fetch("http://localhost:8080/api/v1/teacher", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    console.log("Result", result);
  }

  useEffect(() => {
    fetchTeacher();
  }, []);
  return (
    <div className="bg-[#EAE2FF] min-h-screen w-full pt-16 md:pt-20 px-5">
      <div className=" mt-5 md:px-14 py-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-heading">
          Account Setting
        </h1>
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
        <div className=" flex flex-col-reverse sm:flex-row gap-5">
          <PersonalInfoCard />
          <PlanInfo/>
        </div>
        <Password />
      </div>
    </div>
  );
};

export default Profile;
