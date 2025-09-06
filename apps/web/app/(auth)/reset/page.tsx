"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const Reset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || `HTTP error! status: ${res.status}`);
      }
      if (result.success === false) {
        throw new Error(result.message || "Operation failed");
      }

      setMessage(result.message);
      setErrorMsg("");
      reset();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMsg(errorMessage);
      setMessage("");
    }
  };

  return (
    <div className="max-w-md m-auto p-6 flex flex-col mt-24">
      <h1 className="text-[28px] sm:text-4xl text-[#0F172A] mb-3">
        Reset Password
      </h1>
      <span className="text-sm sm:text-base leading-snug text-[#475569] mb-5">
        Enter your email and new password below
      </span>

     {(message || errorMsg) && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mb-5 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
          {message || errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-sm sm:text-base leading-snug text-[#F97316] hover:text-[#c2410c] underline"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Reset;
