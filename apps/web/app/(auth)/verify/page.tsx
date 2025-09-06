"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Verify = () => {
  const [verifying, setVerifying] = useState<boolean>(true);
  const [submitError, setSubmitError] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail") || "";
    setEmail(storedEmail);

    verifyEmail();
  }, []);

  async function verifyEmail() {
    setVerifying(true);
    setSubmitError("");

    try {
      const response = await fetch(`/api/auth/verify?token=${token}`);

      const result = await response.json();

      if (!response.ok || result.success === false) {
        setSubmitError(result.error || "Verification failed");
        setVerifying(false);
        return;
      }

      if (result.success) {
        setSubmitError(result.message || "Email verified successfully! Reset your password");
        localStorage.removeItem("verifyEmail");

        if (result.purpose === "forgot-password") {
          router.push("/reset");
        }
        if (result.purpose === "register") {
          setVerifying(false);
          setSubmitError("Your email address has been verified");
        }
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      setVerifying(false);
    }
  }

  return (
    <div className="max-w-md m-auto p-6 flex flex-col mt-24">
      <h1 className="text-[28px] sm:text-4xl text-[#0F172A] mt-5">
        Verification
      </h1>
      <p className="my-5 text-base md:text-lg text-[#4B5563] max-w-xs self-start">
        {submitError ? submitError : `We are Verifying your email: ${email}.`}
      </p>

      <button
        disabled={verifying}
        onClick={() => router.push("/login")}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          verifying
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
        }`}
      >
        {verifying ? "Verifying Email..." : "Back to Login"}
      </button>
    </div>
  );
};

export default Verify;
