"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type Inputs = {
  password: string;
  email: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const [show, setShow] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSubmitError("");
      setSubmitSuccess(false);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setSubmitError(
          result.error || "Authentication failed. Please try again."
        );
        return;
      }

      if (result?.ok) {
        setSubmitSuccess(true);
        reset();

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="max-w-md m-auto p-6 flex flex-col">
      <h1 className="text-[28px] sm:text-4xl text-heading mt-5">
        Log in to your account
      </h1>
      <span className="text-sm sm:text-base leading-snug text-muted mt-3">
        Connect with Smritya:
      </span>

      {submitError && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-5 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform text-[#E53935]">
          {submitError}
        </div>
      )}

      <div className="my-5">
        <button
          type="button"
          onClick={() => signIn("google",{callbackUrl: "/dashboard"})}
          className="w-full inline-flex items-center justify-center py-2 px-4 mb-7 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform"
        >
          {/* Google SVG Icon */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.72 1.22 9.21 3.6l6.85-6.85C35.69 2.62 30.24 0 24 0 14.64 0 6.48 5.74 2.56 14.06l7.98 6.19C12.27 13.37 17.65 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.14-3.08-.39-4.55H24v9.11h12.94c-.56 2.9-2.23 5.36-4.75 7.01l7.3 5.66c4.26-3.93 6.49-9.72 6.49-17.23z"
            />
            <path
              fill="#FBBC05"
              d="M10.54 28.25c-.48-1.43-.75-2.95-.75-4.5s.27-3.07.75-4.5l-7.98-6.19C.92 16.74 0 20.24 0 23.75s.92 7.01 2.56 10.19l7.98-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.91-2.13 15.88-5.78l-7.3-5.66c-2.05 1.38-4.69 2.19-8.58 2.19-6.35 0-11.73-3.87-13.46-9.25l-7.98 6.19C6.48 42.26 14.64 48 24 48z"
            />
          </svg>

          <span className="ml-2 text-center text-sm sm:text-base leading-snug text-muted">
            Continue With Google
          </span>
        </button>
        <div className="flex justify-center items-center">
          <div className=" w-full border-t border-gray-300"></div>
          <div className=" w-full text-center text-sm sm:text-base leading-snug text-muted">
            Or continue with
          </div>
          <div className=" w-full border-t border-gray-300"></div>
        </div>
      </div>

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
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
              onClick={() => setShow((p) => !p)}
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

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm sm:text-base leading-snug text-muted underline"
          >
            Forgot your password?
          </Link>
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
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="text-sm sm:text-base leading-snug text-muted mt-5">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="ml-0.5 underline text-primary hover:text-[#c2410c]"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
