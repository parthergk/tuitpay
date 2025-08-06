"use client";
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
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.json();
      console.log("Registration success:", data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" m-auto flex w-xl shadow-xl p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-5">
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
          <button type="submit" className=" bg-gray-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
