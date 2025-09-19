import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  password: string;
  confirm_password: string;
};

const Password = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/change_password",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Password not updated please try again"
        );
      }

      reset();
      setAllowSubmit(false);
      setMessage(result.message || "Password updated successfully.");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Password not updated. Please check your internet connection.";
      setMessage(errorMsg);
    }
  };

  const passwordValue = watch("password");
  const confirmPassword = watch("confirm_password");

  useEffect(() => {
    if (passwordValue && passwordValue.length > 0) {
      console.log("Inside first if");
      if (passwordValue === confirmPassword) {
        console.log("Inside second if");
        setAllowSubmit(true);
      }
    }
  }, [passwordValue, confirmPassword]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);
  return (
    <div className="w-full mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-heading">
        Password
      </h1>
      {message && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-3 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-3"
      >
        <div>
          <label
            htmlFor="password"
            className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full border border-slate-300 rounded-md flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
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
              className="px-3 py-2 text-gray-500 hover:text-primary"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
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
          <div className="w-full border border-slate-300 rounded-md flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
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
              className="px-3 py-2 text-gray-500 hover:text-primary"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!allowSubmit || isSubmitting}
          className={` self-start py-2 px-4 rounded-md font-medium transition-colors ${
            allowSubmit || isSubmitting
              ? "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
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
