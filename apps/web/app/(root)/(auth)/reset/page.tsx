"use client";
import { useRouter } from "next/navigation";
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }
      if (data.success === false) {
        throw new Error(data.message || 'Operation failed');
      }

      setMessage(data.message);
      reset();
      router.push("/sign-in");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setMessage(errorMessage);
    }
  };
  return (
    <div className=" m-auto flex w-xl shadow-xl p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-5">
          {
            message && (
             <p className="mt-1 text-sm text-green-600">
                {message}
              </p>
            )
          }
          <div className=" flex gap-2">
            <label>New Password</label>
            <input
              className=" border"
              type="text"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className=" flex gap-2">
            <label>Email</label>
            <input
              className=" border"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button type="submit" className=" bg-gray-100" disabled={isSubmitting}>
            {
              isSubmitting? "Submitting" : "Submit"
            }
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
