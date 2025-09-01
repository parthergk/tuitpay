"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import Link from "next/link";

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
          className="border px-2 cursor-pointer"
          onClick={toggleUserProfile}
        >
          User
        </button>
      ) : (
        <Link href="/login" className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-full bg-primary text-white font-medium shadow-md hover:bg-[#ea580c] transition-colors duration-200">Log In</Link>
      )}

      <Profile isShow={showProfile} setShowProfile={setShowProfile} />
    </div>
  );
};

export default User;
