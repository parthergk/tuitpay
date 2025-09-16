import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserProfile } from "../../../context/UserProfileProvider";

type ProfileInputs = {
  name: string;
  phone: string;
  tuitionClassName: string;
};
const PersonalInfoCard = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { userDetail } = useUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: userDetail?.name,
      phone: userDetail?.phone,
      tuitionClassName: userDetail?.tuitionClassName,
    },
  });

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Profile not updated please try again");
      }
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setErrorMsg("");
      setSuccessMsg(result.message);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Please try again";
      setSuccessMsg("");
      setErrorMsg(errorMsg);
    }
  };
  return (
    <div className=" w-full mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-[#0F172A]">
        Personal information
      </h1>
      {(errorMsg || successMsg) && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-3 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
          {errorMsg}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-3"
      >
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] ${
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
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] ${
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
            htmlFor="tuitionClassName"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Tuition Class Name <span className="text-red-500">*</span>
          </label>
          <input
            id="tuitionClassName"
            type="text"
            {...register("tuitionClassName", {
              required: "Class name is required",
              minLength: {
                value: 2,
                message: "At least 2 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] ${
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
          disabled={!isDirty}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isDirty
              ? "bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoCard;
