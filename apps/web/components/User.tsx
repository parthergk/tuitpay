"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import Link from "next/link";
import { UserIcon } from "lucide-react";

const User = () => {
  const  userRef = useRef<HTMLDivElement | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const session = useSession();

  function toggleUserProfile() {
    if (session.status === "authenticated") {
      setShowProfile((prev) => !prev);
    }
  }

  useEffect(()=>{
    function handleOutsideClick(event:MouseEvent){
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },[showProfile])


  return (
    <div className="relative" ref={userRef}>
      {session.status === "authenticated" ? (
        <button
          className=" h-8 w-8 md:h-9 md:w-9 rounded-md shadow-md bg-primary  flex justify-center items-center cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition-transform duration-150"
          onClick={toggleUserProfile}
        >
          <UserIcon className=" h-7 w-7 text-white p-0.5"/>
        </button>
      ) : (
        <Link href="/login" className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-full bg-primary text-white font-medium shadow-md hover:bg-[#ea580c] transition-colors duration-200">Log In</Link>
      )}

      <Profile isShow={showProfile} setShowProfile={setShowProfile} />
    </div>
  );
};

export default User;
