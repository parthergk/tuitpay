"use client";

import React, { useEffect, useState } from "react";
import StatCard from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";
import { useUserProfile } from "../../../context/UserProfileProvider";
import { IUser } from "@repo/types";
import StudentForm from "../../../components/student/StudentForm";
import Plans from "../../../components/Plans";

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
  const [isOpenPlans, setIsOpenPlans] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const profileContext = useUserProfile();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("https://253f38ac0cf6.ngrok-free.app/api/v1/dashboard", {
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
        <div className="mb-6">
          <h1 className="text-[28px] sm:text-4xl text-[#0F172A]">Dashboard</h1>
          <p className="text-sm sm:text-base leading-snug text-[#475569] mt-1">
            Track your students’ fee status and manage your profile
          </p>
        </div>

        {/* {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {errorMsg}
          </div>
        )} */}

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

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
          {/* Student Card */}
          <div className="col-span-3 flex flex-col h-full max-h-[245px] bg-gradient-to-br from-[#E8DFFF] via-[#F0F4FF] to-[#E8DFFF] rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg leading-snug text-[#475569]">
                Students
              </h2>
              <button
                onClick={handleAddStudent}
                className="px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm sm:text-base leading-snug text-white rounded-md transition"
              >
                Add Student
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
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

            {dashboardData?.teacher && (
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
          )}
        </div>
      </div>
    </div>
  );
}
