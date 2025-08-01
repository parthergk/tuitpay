"use client";

import React, { useEffect, useState } from "react";
import StatCards from "../../../components/dashboard/StatCards";
import Student from "../../../components/dashboard/Student";
import { TeacherCard } from "../../../components/dashboard/TeacherCard";

interface TeacherInfo {
  name: string;
  phone: string;
  email: string;
  tuitionClassName: string;
  planType: string;
  planStatus: string;
  planActivatedAt: string;
  planExpiresAt: string;
  planPrice: number;
  studentLimit: number;
  isVerified: boolean;
  createdAt: string;
}

interface DashboardData {
  teacherInfo: TeacherInfo;
  students: any[];
  paid: any[];
  unpaid: any[];
  overDue: any[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setDashboardData(data);
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
      color: "bg-green-500",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.unpaid.length || 0,
      color: "bg-yellow-500",
    },
    {
      title: "Total Overdue",
      count: dashboardData?.overDue.length || 0,
      color: "bg-red-500",
    },
  ];

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
          <StatCards
            key={dashboardData?.students.length}
            title="Total Student"
            count={dashboardData?.students.length}
            color="bg-gray-500"
          />
          {statCards.map((card) => (
            <StatCards
              key={card.title}
              title={card.title}
              count={card.count}
              color={card.color}
            />
          ))}
        </div>
      )}

      <div className=" grid grid-cols-4 gap-4 mt-6">
        {/* student data */}
        <div className="col-span-3 bg-white shadow flex flex-col items-center p-4 rounded-lg">
          {dashboardData?.students.map((student) => (
            <Student name={student.name} />
          ))}
        </div>
        {/* teacher data */}
        {
          <TeacherCard
            name={dashboardData?.teacherInfo.name}
            email={dashboardData?.teacherInfo.email}
            phone={dashboardData?.teacherInfo.phone}
            tuitionClassName={dashboardData?.teacherInfo.tuitionClassName}
            planType={dashboardData?.teacherInfo.planType}
            planStatus={dashboardData?.teacherInfo.planStatus}
            studentLimit={dashboardData?.teacherInfo.studentLimit}
            planActivatedAt={dashboardData?.teacherInfo.planActivatedAt}
            planExpiresAt={dashboardData?.teacherInfo.planExpiresAt}
          />
        }
      </div>
    </div>
  );
}
