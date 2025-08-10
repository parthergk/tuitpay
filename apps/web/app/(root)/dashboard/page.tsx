"use client";

import React, { useEffect, useRef, useState } from "react";
import StatCard from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";
import { useUserProfile } from "../../../context/UserProfileProvider";
import { IUser } from "@repo/types";
import StudentForm from "../../../components/student/StudentForm";

interface DashboardData {
  teacherInfo: IUser;
  students: any[];
  paid: any[];
  unpaid: any[];
  overDue: any[];
}

export default function DashboardPage() {
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

        if (!response.ok) throw new Error("Failed to fetch dashboard data");

        const { data } = await response.json();
        console.log("Data",data);
        
        setDashboardData(data);
        profileContext.setUserDetail(data.teacherInfo);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Paid",
      count: dashboardData?.paid.length || 0,
      color: "bg-gray-500",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.unpaid.length || 0,
      color: "bg-gray-500",
    },
    {
      title: "Total Overdue",
      count: dashboardData?.overDue.length || 0,
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
            <Student key={student.name} student={student}  />
          ))}
          <StudentForm isOpen={showForm} setIsOpen={setShowForm} />
        </div>
        {/* teacher data */}

        {dashboardData?.teacherInfo && (
          <TeacherCard
            name={dashboardData.teacherInfo.name}
            email={dashboardData.teacherInfo.email}
            phone={dashboardData.teacherInfo.phone}
            tuitionClassName={dashboardData.teacherInfo.tuitionClassName}
            planType={dashboardData.teacherInfo.planType}
            planStatus={dashboardData.teacherInfo.planStatus}
            studentLimit={dashboardData.teacherInfo.studentLimit}
            planActivatedAt={dashboardData.teacherInfo.planActivatedAt}
            planExpiresAt={dashboardData.teacherInfo.planExpiresAt}
          />
        )}
      </div>
    </div>
  );
}
