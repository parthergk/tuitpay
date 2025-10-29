"use client";
import React, { useEffect, useState } from "react";
import Password from "../../../components/dashboard/profile/Password";
import PersonalInfoCard from "../../../components/dashboard/profile/PersonalInfoCard";
import PlanInfo from "../../../components/dashboard/profile/PlanInfo";
import { useOpenPlan } from "../../../context/OpenPlanProvider";
import { X } from "lucide-react";
import Plans from "../../../components/Plans";
import UpgradePlan from "../../../components/UpgradePlan";

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
        <UpgradePlan/>
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
