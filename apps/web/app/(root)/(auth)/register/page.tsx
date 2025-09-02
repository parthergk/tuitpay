"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({ mode: "onBlur" });

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmitError("");
      setMessage("");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Registration failed.");
      }

      setMessage(result.message);
      localStorage.setItem("verifyEmail", result.data.email);
      reset();

      router.push("/verify");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Server error";
      setSubmitError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-md focus-within:ring-2 focus-within:ring-blue-500 flex items-center ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              id="password"
              type={show ? "text" : "password"}
              className="w-full px-3 py-2 focus:outline-none rounded-l-md"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-r-md transition-colors"
              onClick={() => setShow((p) => !p)}
            >
              {show ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          } text-white`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-2 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="ml-0.5 underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
