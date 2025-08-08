"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
}
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

       if (data.success === false) {
        throw new Error(data.message || 'Operation failed');
      }

      setMessage(data.message);
      localStorage.setItem("verifyEmail", email);
      reset();

      router.push("/verify");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error. Please try again.";
      setMessage(errorMessage);
    }
  };
  return (
    <div className=" m-auto flex shadow-xl w-lg mt-5 p-2">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className=" w-1/2 flex flex-col gap-3">
          {message && <p className="mt-1 text-sm text-green-600">{message}</p>}
          <label htmlFor="email">Email</label>
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
            className=" border"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className=" bg-gray-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
