"use client";
import { MailWarning } from "lucide-react";
import React, { useEffect, useState } from "react";

const Resend = () => {
  const [isResending, setIsResending] = useState<boolean>(false);
  const [message, setMessage] = useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail") || "";
    setEmail(storedEmail);
  }, []);

  const handleResendCode = async () => {
    setIsResending(true);
    setMessage(null);
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
      setMessage({type:"success",text:"Verification code sent successfully!"});
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again.";
      setMessage({type:"error", text:errorMessage});
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
        We sent you an email with a link to activate your Yadxy account.
      </p>
      {message && (
        <div
          className={`mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 ${
            message.type === "success" ? "text-[#0F9D58]" : "text-[#E53935]"
          }`}
        >
          {message.text}
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
