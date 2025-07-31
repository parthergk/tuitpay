"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "pending" | "completed" | "failed" | "error"
  >("pending");
  const [retryCount, setRetryCount] = useState(0);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    let timeout: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/payment-status?order_id=${orderId}`
        );
        const data = await res.json();

        if (data.status === "completed") {
          setStatus("completed");
          setTimeout(() => router.push("/dashboard"), 2000);
          return;
        }

        if (data.status === "failed") {
          setStatus("failed");
          setTimeout(() => router.push("/payment-failed"), 2000);
          return;
        }

        if (retryCount < 5) {
          timeout = setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 2000);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Error checking payment status", err);
        if (retryCount < 5) {
          timeout = setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 2000);
        } else {
          setStatus("error");
        }
      }
    };

    checkStatus();

    return () => clearTimeout(timeout);
  }, [orderId, retryCount]);

  return (
    <div className="text-center p-10">
      {status === "pending" && (
        <div>
          <p className="text-blue-600">We're verifying your payment...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait a few seconds.
          </p>
        </div>
      )}

      {status === "completed" && (
        <div>
          <p className="text-green-600 font-semibold text-lg">
            ✅ Payment Successful!
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you to the dashboard...
          </p>
        </div>
      )}

      {status === "failed" && (
        <div>
          <p className="text-red-600 font-semibold text-lg">
            ❌ Payment Failed
          </p>
          <p className="text-sm text-gray-500">Try again...</p>
        </div>
      )}

      {status === "error" && (
        <div>
          <p className="text-yellow-600 font-semibold text-lg">
            ⚠️ Unable to verify your payment at the moment.
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Please check your internet or try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusPage;
