"use client";

import React, { useEffect, useState } from "react";
import StatCard from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";
import { useUserProfile } from "../../../context/UserProfileProvider";
import { IUser } from "@repo/types";
import StudentForm from "../../../components/student/StudentForm";
import Plans from "../../../components/Plans";
import { X } from "lucide-react";
import { useOpenPlan } from "../../../context/OpenPlanProvider";

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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const profileContext = useUserProfile();
  const {isOpenPlans, setIsOpenPlans} = useOpenPlan();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();

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
      textColor: "text-[#4B5563]",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.payments?.unpaid?.length || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-[#4B5563]",
    },
    {
      title: "Total Overdue",
      count: dashboardData?.payments?.overDue?.length || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-[#4B5563]",
    },
  ];

  const handleAddStudent = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="h-screen px-5 pb-5 pt-24 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)] flex flex-col">
      <div className="relative flex flex-col flex-1 w-full h-full mx-auto rounded-xl bg-offwhite/50 backdrop-blur-sm shadow-xl py-6 px-3 sm:px-4 md:px-5">
        {/* Header Section */}
        <div className="mb-5">
          <h1 className="text-[28px] sm:text-4xl text-[#0F172A]">Dashboard</h1>
          <p className="text-sm sm:text-base leading-snug text-[#475569] mt-1">
            Track your students’ fee status and manage your profile
          </p>
        </div>

        {errorMsg && (
          <div className="mb-2 py-1.5 px-3 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {errorMsg}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Students"
            count={dashboardData?.students.length || 0}
            color="bg-primary"
            textColor="text-white"
          />
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              count={card.count}
              color={card.color}
              textColor={card.textColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
          {/* Student Card */}
          <div className="col-span-3 flex flex-col h-full max-h-[280px] sm:max-h-[245px] bg-gradient-to-bl from-[#F0F4FF] via-[#ebe3ff]/50 to-[#f0ebfd] rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl leading-snug text-[#0F172A]">
                Students
              </h2>
              <button
                onClick={handleAddStudent}
                className="px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm sm:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
              >
                Add Student
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden pr-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#f97316 #e5e7eb",
              }}
            >
              {dashboardData?.students.map((student) => (
                <Student key={student._id} student={student} />
              ))}
            </div>
            <StudentForm
              isOpen={showForm}
              setIsOpen={setShowForm}
              fetchData={fetchDashboardData}
            />
          </div>

          {dashboardData?.teacher ? (
            <TeacherCard
              name={dashboardData.teacher.name}
              email={dashboardData.teacher.email}
              phone={dashboardData.teacher.phone}
              tuitionClassName={dashboardData.teacher.tuitionClassName}
              planType={dashboardData.teacher.planType}
              planStatus={dashboardData.teacher.planStatus}
              studentLimit={dashboardData.teacher.studentLimit}
              planActivatedAt={dashboardData.teacher.planActivatedAt}
              planExpiresAt={dashboardData.teacher.planExpiresAt}
              setIsOpnePlans={setIsOpenPlans}
            />
          ) : (
            <div className="w-full h-full max-h-[245px] min-w-56 hidden md:block col-span-1 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] rounded-2xl shadow-md max-w-sm border border-gray-200"></div>
          )}
          {isOpenPlans && (
            <div className="fixed h-full w-full inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-3xl rounded-lg">
              <div className=" h-full w-full m-auto p-3 flex flex-col bg-gradient-to-bl from-[#E8DFFF] to-[#DDEBFF] border-l border-white/50 shadow-xl shadow-black/10 rounded-lg">
                <div className=" w-full flex justify-between items-center">
                  <h1 className="text-[28px] sm:text-4xl text-[#0F172A]">
                   Upgrade Your Plan
                  </h1>
                  <button
                    onClick={()=>setIsOpenPlans(pre=>!pre)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <X />
                  </button>
                </div>
                <Plans />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
