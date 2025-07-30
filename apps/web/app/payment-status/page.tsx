"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("checking");
  const [retryCount, setRetryCount] = useState(0);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const checkStatus = async () => {
      if (!orderId) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/payment-status?order_id=${orderId}`
        );
        
        const { status: paymentStatus } = await response.json();
        
        if (paymentStatus === "completed") {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 2000); // Show success for 2 seconds
        } else if (paymentStatus === "failed") {
          setStatus("failed");
          setTimeout(() => router.push("/payment-failed"), 3000);
        } else {
          // // Retry logic with maximum attempts
          // if (retryCount < 10) { // Max 20 seconds of checking
          //   setRetryCount(prev => prev + 1);
          //   setTimeout(checkStatus, 2000);
          // } else {
          //   setStatus("timeout");
          // }
          setStatus("timeout");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        // if (retryCount < 5) {
        //   setRetryCount(prev => prev + 1);
        //   setTimeout(checkStatus, 2000);
        // } else {
        //   setStatus("error");
        // }
      }
    };

    checkStatus();
  }, [orderId, retryCount]);

  return (
    <div className="text-center p-10">
      {status === "checking" && (
        <div>
          <p>Verifying your payment...</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        </div>
      )}
      {status === "success" && (
        <div>
          <p className="text-green-600">Payment successful!</p>
          <p className="text-sm">Redirecting to dashboard...</p>
        </div>
      )}
      {status === "failed" && (
        <div>
          <p className="text-red-600">Payment failed!</p>
          <p className="text-sm">Redirecting...</p>
        </div>
      )}
      {status === "timeout" && (
        <div>
          <p className="text-yellow-600">Payment verification taking longer than expected</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Check Again
          </button>
        </div>
      )}
      {status === "error" && (
        <div>
          <p className="text-red-600">Something went wrong while verifying payment.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default page;