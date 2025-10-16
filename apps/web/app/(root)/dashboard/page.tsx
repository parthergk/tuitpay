"use client";
import React, { lazy, Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { useOpenPlan } from "../../../context/OpenPlanProvider";
import RightBar from "../../../components/dashboard/RightBar";
import User from "../../../components/User";

import Dashboard from "../../../components/dashboard/Dashboard";
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
      <div className="relative flex flex-col flex-1 w-full min-h-screen sm:min-h-full mx-auto rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-5 md:py-6 px-5 sm:px-4 md:px-5">
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

        {sections.map(
          (item) =>
            item.name === section && <div key={item.name}>{item.component}</div>
        )}
      </div>
    </div>
  );
}