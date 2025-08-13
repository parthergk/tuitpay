"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");

  useEffect(() => {
    // Optional: Redirect after 3 seconds
    if (status === "completed") {
      setTimeout(() => router.push("/dashboard"), 10000);
    } 
    // else if (status === "failed") {
    //   setTimeout(() => router.push("/payment-failed"), 3000);
    // }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "completed" ? (
        <div className="text-center">
          <p className="text-green-600 font-semibold text-lg">✅ Payment Successful!</p>
          <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
        </div>
      ) : status === "failed" ? (
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">❌ Payment Failed</p>
          <p className="text-sm text-gray-500">Redirecting to retry page...</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-yellow-600 font-semibold text-lg">⚠️ Unknown Payment Status</p>
          <p className="text-sm text-gray-500">Please check your email or contact support.</p>
        </div>
      )}
    </div>
  );
}
