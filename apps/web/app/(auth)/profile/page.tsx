"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ProfileInputs = {
  name: string;
  phone: string;
  tuitionClassName: string;
};

const CompleteProfile = () => {
  const {data:session, update} = useSession();
  const email = session?.user.email;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInputs>({ mode: "onBlur" });
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      setMessage("");
      const response = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, email}),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Profile update failed.");
      }

      await update();
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Server error";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="max-w-md m-auto p-6 mt-16">
      <h1 className="text-[28px] sm:text-4xl text-heading mb-3">
        Complete Your Profile
      </h1>
      <span className="text-sm sm:text-base leading-snug text-muted">
        Fill in your details to complete your profile
      </span>
      {message  && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-5 mb-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform text-[#E53935]">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-3">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.name ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Invalid phone number",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.phone ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Tuition Class Name */}
        <div>
          <label
            htmlFor="className"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Tuition Class Name <span className="text-red-500">*</span>
          </label>
          <input
            id="className"
            type="text"
            {...register("tuitionClassName", {
              required: "Class name is required",
              minLength: {
                value: 2,
                message: "At least 2 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.tuitionClassName ? "border-red-500" : "border-slate-300"
            }`}
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
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
