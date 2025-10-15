"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import StatCard from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";
import { useUserProfile } from "../../../context/UserProfileProvider";
import { IUser } from "@repo/types";
import StudentForm from "../../../components/student/StudentForm";
import Plans from "../../../components/Plans";
import { Menu, X } from "lucide-react";
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

interface DashboardData {
  teacher: IUser;
  students: any[];
  payments: {
    paid: any[];
    unpaid: any[];
    overDue: any[];
  };
}

export default function DashboardPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const profileContext = useUserProfile();
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

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/dashboard/summary",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();
      console.log("Result", result);

      if (result.success === false) {
        throw new Error(result.message || "Please try again later.");
      }

      setDashboardData(result.data);
      profileContext.setUserDetail(result.data.teacher);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Please try again";
      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Paid",
      count: dashboardData?.payments?.paid?.length || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.payments?.unpaid?.length || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
    },
    {
      title: "Total Overdue",
      count: dashboardData?.payments?.overDue?.length || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
    },
  ];

  const handleAddStudent = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="relative h-screen md:p-5 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)] flex gap-1 sm:gap-5">
      <RightBar isOpen={isOpen} setIsOpen={setIsOpen} setSection={setSection} />
      <div className="relative flex flex-col flex-1 w-full h-full mx-auto rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-5 md:py-6 px-5 sm:px-4 md:px-5">
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

        {errorMsg && (
          <div className="mb-2 py-1.5 px-3 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {errorMsg}
          </div>
        )}

        {sections.map(
          (item) =>
            item.name === section && <div key={item.name}>{item.component}</div>
        )}
      </div>
    </div>
  );
}
