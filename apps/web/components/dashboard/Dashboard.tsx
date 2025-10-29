import React, { useEffect, useState } from "react";
import StatCard from "./StatCards";
import ActivityCard from "./ActivityCard";
import Upcoming from "./Upcoming";
import { useOverDue } from "../../context/OverDueProvider";

interface DashboardData {
  recentActivity: {
    name: string;
    amount: number;
    paidDate: string;
  }[];
  upcomingDues: {
    id:string;
    name: string;
    amount: number;
    daysOverdue: number;
  }[];
  summary: {
    paid: string;
    unpaid: string;
    overdue: string;
    totalStudents: string;
  };
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const {setOverDues} = useOverDue();
  const [errorMsg, setErrorMsg] = useState("");

  const statCards = [
    {
      title: "Total Paid",
      count: dashboardData?.summary.paid || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
    },
    {
      title: "Total Unpaid",
      count: dashboardData?.summary?.unpaid || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
    },
    {
      title: "Total Overdue",
      count: dashboardData?.summary?.overdue || 0,
      color: "bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30",
      textColor: "text-sub",
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
      if (result.success === false) {
        throw new Error(result.message || "Please try again later.");
      }

      setDashboardData(result);
      setOverDues(result.upcomingDues);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? `${error.message} please check your internet connection`
          : "Please try again";
      setErrorMsg(errorMessage);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  return (
    <>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 ">
        <StatCard
          title="Total Students"
          count={dashboardData?.summary.totalStudents || 0}
          color="bg-primary"
          textColor="text-white"
        />
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            count={card.count}
            color={card.color}
          />
        ))}
      </div>
      {errorMsg && (
      <div className="mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 text-[#E53935]">
          {errorMsg}
        </div>
      )}
      <div className=" grid grid-cols-1 sm:grid-cols-2  gap-5">
       { dashboardData?.recentActivity && <ActivityCard activity={dashboardData?.recentActivity} />}
        { dashboardData?.upcomingDues && <Upcoming upcomingDues={dashboardData?.upcomingDues} />}
      </div>
    </>
  );
};

export default Dashboard;
