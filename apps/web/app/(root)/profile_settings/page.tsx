"use client";
import React from "react";
import PersonalInfoCard from "../../../components/dashboard/profile/PersonalInfoCard";
import Password from "../../../components/dashboard/profile/Password";


const Profile = () => {
  
  return (
    <div className="bg-[#EAE2FF] min-h-screen w-full pt-16 md:pt-20 px-5">
      <div className=" mt-5 md:px-14 py-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-heading">
          Account Setting
        </h1>
        <PersonalInfoCard/>
        <Password/>
      </div>
    </div>
  );
};

export default Profile;
