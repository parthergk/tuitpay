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
        <Link href="/sign-in" className=" text-lg tracking-wider hover:text-[#4D4D4D]">Get Strat</Link>
      )}

      <Profile isShow={showProfile} setShowProfile={setShowProfile} />
    </div>
  );
};

export default User;
