"use client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  tuitionClassName: string;
};

type ApiError = {
  message: string;
  field?: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmitError("");
      setMessage("");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Error from the not ok");

        throw new Error(
          result.error || "Registration failed. Please try again."
        );
      }

      if (result.success === false) {
        console.log("Error from the not success");
        throw new Error(result.error || "Operation failed");
      }

      setMessage(result.message);
      localStorage.setItem("verifyEmail", result.data.email);
      reset();

      router.push("/verify");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "server side error";
      setSubmitError(
        errorMessage ||
          "Network error. Please check your connection and try again."
      );
    }
  };

  function togglePasswordVisibility() {
    setShow((pre) => !pre);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

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
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Invalid phone number format",
              },
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div
            className={`w-full border rounded-md focus-within:ring-2 focus-within:ring-blue-500 flex justify-center items-center ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
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
              onClick={togglePasswordVisibility}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="className"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class Name <span className="text-red-500">*</span>
          </label>
          <input
            id="className"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tuitionClassName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("tuitionClassName", {
              required: "Class name is required",
              minLength: {
                value: 2,
                message: "Class name must be at least 2 characters",
              },
            })}
          />
          {errors.tuitionClassName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.tuitionClassName.message}
            </p>
          )}
        </div>

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
      <div className=" mt-2">
        Already Have An Account?{" "}
        <Link href={"/sign-in"} className="ml-0.5 underline">
          Sign-in
        </Link>
      </div>
    </div>
  );
};

export default Register;
