"use client";
import { MailWarning } from "lucide-react";
import React, { useEffect, useState } from "react";

const Resend = () => {
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail") || "";
    setEmail(storedEmail);
  }, []);

  const handleResendCode = async () => {
    setIsResending(true);
    setResendMessage("");
    setSubmitError("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code");
      }

      if (data.success === false) {
        console.log("Error from the not success");
        throw new Error(data.error || "Operation failed");
      }
      setResendMessage("Verification code sent successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className="max-w-md m-auto p-6 flex flex-col mt-16">
      <h1 className="text-[28px] sm:text-4xl text-heading mt-5">
        Almost there
      </h1>
      <p className="mt-3 text-base md:text-lg text-sub max-w-xs self-start">
        We sent you an email with a link to activate your Feexy account.
      </p>
      {(resendMessage || submitError) && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-5 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
          {resendMessage || submitError}
        </div>
      )}
      <div className="w-full flex gap-2 items-center justify-center py-2 px-4 mt-5 mb-2 rounded-md text-base md:text-lg text-sub bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
        <MailWarning className=" self-start" />
        <span>
          You need to verify your email address to activate your account.
        </span>
      </div>
      <span className="my-3 text-base md:text-lg text-sub">
        Didn't get the email?
      </span>
      <button
        onClick={() => handleResendCode()}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          isResending
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
        }`}
      >
        Resend activation link
      </button>
    </div>
  );
};

export default Resend;
