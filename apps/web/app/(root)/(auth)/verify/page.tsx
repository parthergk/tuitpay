"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(new Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // State management
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  // Resend functionality
  const [canResend, setCanResend] = useState<boolean>(false);
  const [resendCountdown, setResendCountdown] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCountdown > 0 && !canResend) {
      timer = setTimeout(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    } else if (resendCountdown === 0) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCountdown, canResend]);

  useEffect(() => {
    const isComplete = code.every((digit) => digit !== "");
    if (isComplete && !isSubmitting) {
      handleSubmit();
    }
  }, [code]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const verificationCode = code.join("");
    if (verificationCode.length !== 4) {
      setSubmitError("Please enter the complete 4-digit code");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    const payload = { code: verificationCode, email };

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      if (data.success) {
        setSubmitSuccess(data.message || "Email verified successfully!");
        localStorage.removeItem("verifyEmail");

        console.log("Purpose", data);

        if (data.purpose === "forgot-password") {
          router.push("/reset");
        }
        if (data.purpose === "register") {
          router.push("/login");
        }
        // setTimeout(() => {
        //   router.push("/login");
        // }, 2000);
      } else {
        setSubmitError(data.error || "Verification failed");
        setCode(new Array(4).fill(""));
        inputsRef.current[0]?.focus();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please try again.";
      setSubmitError(errorMessage);
      setCode(new Array(4).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setResendMessage("");
    setSubmitError("");

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code");
      }

      if (data.success === false) {
        console.log("Error from the not success");
        throw new Error(data.error || "Operation failed");
      }
      setResendMessage("Verification code sent successfully!");
      setCanResend(false);
      setResendCountdown(60);

      // Clear any existing code
      setCode(new Array(4).fill(""));
      inputsRef.current[0]?.focus();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  function handleInputChange(value: string, index: number) {
    if (value && !/^\d$/.test(value)) return;

    const newArray = [...code];
    newArray[index] = value;
    setCode(newArray);

    if (submitError) setSubmitError("");

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleOnPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").slice(0, 4).split("");
    const updated = [...code];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) updated[i] = char;
    });
    setCode(updated);

    const nextEmptyIndex = updated.findIndex(
      (digit, i) => i < 4 && digit === ""
    );
    const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
    inputsRef.current[focusIndex]?.focus();
  }

  const formatEmail = (email: string) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (name && name.length <= 3) return email;
    if (!name) return;
    return `${name.slice(0, 2)}***@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 4-digit verification code to
          </p>
          <p className="text-center text-sm font-medium text-gray-900">
            {formatEmail(email)}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">{submitSuccess}</p>
                <p className="text-sm">Redirecting to login...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {submitError}
            </div>
          )}

          {/* Resend Success Message */}
          {resendMessage && (
            <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {resendMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Enter verification code
              </label>

              <div className="flex space-x-3 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      submitError
                        ? "border-red-500"
                        : digit
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                    }`}
                    value={digit}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    onPaste={(e) => handleOnPaste(e)}
                    disabled={isSubmitting}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>
          </form>

          <div className=" text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>

            {canResend ? (
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend code in {resendCountdown} seconds
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/register")}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
