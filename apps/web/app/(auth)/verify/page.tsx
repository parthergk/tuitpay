"use client";
import { signIn } from "next-auth/react";
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

    verifyEmail(storedEmail);
  }, []);

  async function verifyEmail(storedEmail: string) {
    setVerifying(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `/api/auth/verify?token=${encodeURIComponent(token!)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (!result.success) {
        setSubmitError(result.error || "Verification failed");
        setVerifying(false);
        return;
      }

      if (result.purpose === "register") {
        setSubmitError("Email verified successfully!");

        const signInResult = await signIn("credentials", {
          redirect: false,
          email: storedEmail,
          token,
        });

        if (signInResult?.error) {
          setSubmitError("Auto-login failed. Please login manually.");
          setVerifying(false);
          return;
        }
        router.push("/profile");
      }

      if (result.purpose === "forgot-password") {
        setSubmitError("Email verified! Reset your password.");
        localStorage.removeItem("verifyEmail");
        router.push("/reset");
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
      setVerifying(false);
    }
  }

  return (
    <div className="max-w-md m-auto p-6 flex flex-col mt-24">
      <h1 className="text-[28px] sm:text-4xl text-heading mt-5">
        Verification
      </h1>
      <p className="my-5 text-base md:text-lg text-sub max-w-xs self-start">
        {submitError ? submitError : `We are Verifying your email: ${email}.`}
      </p>

      <button
        disabled={verifying}
        onClick={() => router.push("/login")}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          verifying
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
        }`}
      >
        {verifying ? "Verifying Email..." : "Back to Login"}
      </button>
    </div>
  );
};

export default Verify;
