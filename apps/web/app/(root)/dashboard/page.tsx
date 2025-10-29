"use client";
import React, { lazy, Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import { useOpenPlan } from "../../../context/OpenPlanProvider";
import RightBar from "../../../components/dashboard/RightBar";
import User from "../../../components/User";

import Dashboard from "../../../components/dashboard/Dashboard";
import { OverdueProvider } from "../../../context/OverDueProvider";
import { FeeRecordProvider } from "../../../context/FeeRecordProvider";
import Plans from "../../../components/Plans";
const Students = lazy(() => import("../../../components/dashboard/Students"));
const FeeTracking = lazy(
  () => import("../../../components/dashboard/FeeTracking")
);
const Report = lazy(() => import("../../../components/dashboard/Report"));
const Reminder = lazy(() => import("../../../components/dashboard/Reminders"));

export default function DashboardPage() {
  const { isOpenPlans, setIsOpenPlans } = useOpenPlan();
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState("dashboard");

  const sections = [
    { name: "dashboard", component: <Dashboard /> },
    {
      name: "students",
      component: (
        <Suspense fallback={<div>Loading...</div>}>
          <Students />
        </Suspense>
      ),
    },
    {
      name: "fee Tracking",
      component: (
        <Suspense fallback={<div>Loading...</div>}>
          <FeeTracking />
        </Suspense>
      ),
    },
    {
      name: "reminder",
      component: (
        <Suspense fallback={<div>Loading...</div>}>
          <Reminder />
        </Suspense>
      ),
    },
    {
      name: "report",
      component: (
        <Suspense fallback={<div>Loading...</div>}>
          <Report />
        </Suspense>
      ),
    },
  ];

  return (
    <div className="relative sm:h-screen md:p-5 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)] flex gap-1 sm:gap-5">
      <RightBar isOpen={isOpen} setIsOpen={setIsOpen} setSection={setSection} />
      <div className="relative flex flex-col flex-1 w-full min-h-screen sm:min-h-full mx-auto rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-4 md:py-6 px-3 sm:px-4 md:px-5">
        {/* Header Section */}
        <div className=" flex flex-col md:flex-row-reverse justify-between md:items-start">
          <div className=" flex justify-between items-center">
            <div
              onClick={() => setIsOpen(true)}
              className=" block md:hidden cursor-pointer"
            >
              <Menu size={28} />
            </div>
            <User />
          </div>

          <div className=" mt-5 md:mt-0 mb-5 ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-heading">
              Dashboard
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-sub mt-1">
              Track your students’ fee status and manage your profile
            </p>
          </div>
        </div>
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
        <FeeRecordProvider>
          <OverdueProvider>
            {sections.map(
              (item) =>
                item.name === section && (
                  <div key={item.name}>{item.component}</div>
                )
            )}
          </OverdueProvider>
        </FeeRecordProvider>
      </div>
    </div>
  );
}
