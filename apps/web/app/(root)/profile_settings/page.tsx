"use client";
import React, { useEffect, useState } from "react";
import Password from "../../../components/dashboard/profile/Password";
import PersonalInfoCard from "../../../components/dashboard/profile/PersonalInfoCard";
import PlanInfo from "../../../components/dashboard/profile/PlanInfo";
import UpgradePlan from "../../../components/UpgradePlan";

const Profile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTeacher() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/teacher`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load profile.");
      }

      setTeacher(result.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <div className="bg-[#EAE2FF] min-h-screen w-full pt-16 md:pt-20 px-5">
      <div className="mt-5 md:px-14 py-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-heading">
          Account Settings
        </h1>

        {loading && (
          <div className="text-center py-10 text-slate-600 animate-pulse">
            Loading profile...
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 text-[#E53935]">
            {error}
          </div>
        )}

        {teacher && (
          <>
            <UpgradePlan />
            <div className="flex flex-col-reverse md:flex-row gap-5">
              <PersonalInfoCard teacherInfo={teacher} />
              <PlanInfo planInfo={teacher} />
            </div>
            <Password />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
