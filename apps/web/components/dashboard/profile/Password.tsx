import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  password: string;
  confirm_password: string;
};

const Password = () => {
  const [show, setShow] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Submitted data:", data);
  };

  const passwordValue = watch("password");

  return (
    <div className="w-full mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-[#0F172A]">Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-3">
        <div>
          <label
            htmlFor="password"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full border border-slate-300 rounded-md flex items-center focus-within:ring-2 focus-within:ring-[#F97316] focus-within:border-[#F97316]">
            <input
              id="password"
              type={show ? "text" : "password"}
              className="w-full px-3 py-2 rounded-l-md focus:outline-none"
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
              className="px-3 py-2 text-gray-500 hover:text-[#F97316]"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirm_password"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full border border-slate-300 rounded-md flex items-center focus-within:ring-2 focus-within:ring-[#F97316] focus-within:border-[#F97316]">
            <input
              id="confirm_password"
              type={show ? "text" : "password"}
              className="w-full px-3 py-2 rounded-l-md focus:outline-none"
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="px-3 py-2 text-gray-500 hover:text-[#F97316]"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-600">{errors.confirm_password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={` self-start py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
            ? "bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Changing..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default Password;
