"use client";
import React, { Suspense } from "react";
import VerifyContent from "../../../components/VerifyContent ";

const Verify = () => {
  return (
    <Suspense fallback={<div className="text-center mt-24">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
};

export default Verify;
