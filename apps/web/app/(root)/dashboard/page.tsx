"use client";

import React, { useEffect, useRef, useState } from "react";
import StatCard from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";
import { useUserProfile } from "../../../context/UserProfileProvider";
import { IUser } from "@repo/types";
import StudentForm from "../../../components/student/StudentForm";

interface DashboardData {
  teacher: IUser;
  students: any[];
  payments:{
    paid: any[];
    unpaid: any[];
    overDue: any[];
  }
}

export default function DashboardPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const profileContext = useUserProfile();

  useEffect(() => {
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
          throw new Error(
            `Failed to fetch dashboard data`
          );
        }

        const result = await response.json();
        
        if (result.success === false) {
          throw new Error(result.message || "Please try again later.");
        }
        
        setDashboardData(result.data);
        profileContext.setUserDetail(result.data.teacher);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Please try again";
        setErrorMsg(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


   const statCards = [
    {
      title: "Total Paid",
      count: dashboardData?.payments?.paid?.length || 0,
      color: "bg-gray-500",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.payments?.unpaid?.length || 0,
      color: "bg-gray-500",
    },
    {
      title: "Total Overdue",
      count:  dashboardData?.payments?.overDue?.length || 0,
      color: "bg-gray-500",
    },
  ];

  function handleAddStudent() {
    setShowForm((pre) => !pre);
  }
  
  return (
    <div className="m-2 bg-gray-400 rounded-lg p-4 shadow">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Track your students’ fee status</p>
      </div>

      {/* error message */}
      {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}
      
      {/* stat data */}
      {isLoading ? (
        <p className="mt-4 text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <StatCard
            key={dashboardData?.students.length}
            title="Total Student"
            count={dashboardData?.students.length}
            color="bg-gray-500"
            textColor="text-black"
          />
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              count={card.count}
              color={card.color}
              textColor="text-black"
            />
          ))}
        </div>
      )}

      <div className=" grid grid-cols-4 gap-4 mt-6">
        {/* student data */}
        <div className=" relative col-span-3 bg-white shadow flex flex-col items-center p-4 rounded-lg">
          <div className=" w-full flex justify-between items-center">
            <h1 className=" font-medium">student</h1>
            <button
              className=" border px-2 cursor-pointer"
              onClick={handleAddStudent}
            >
              Add student
            </button>
          </div>
          {dashboardData?.students.map((student) => (
            <Student key={student.name} student={student} />
          ))}
          <StudentForm isOpen={showForm} setIsOpen={setShowForm} />
        </div>
        {/* teacher data */}

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
          />
        )}
      </div>
    </div>
  );
}
