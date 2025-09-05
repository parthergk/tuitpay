"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Verify = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    verifyEmail();
  }, []);

  async function verifyEmail() {
    const response = await fetch(
      `http://localhost:3000/api/auth/verify?token=${token}`
    );
    const result = await response.json();
  }

  return <div>Check your email we send a verification link! Please verify</div>;
};

export default Verify;
