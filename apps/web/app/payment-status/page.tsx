"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentStatusPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const orderId = sp.get("order_id");
  const [status, setStatus] = useState<
    "pending" | "completed" | "failed" | "error"
  >("pending");
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const check = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/payment-status?order_id=${orderId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.status === "completed") {
          setStatus("completed");
          setTimeout(() => router.push("/dashboard"), 3000);
          return;
        }

        if (data.status === "failed") {
          setStatus("failed");
          // optionally redirect to a retry page
          return;
        }

        if (retries < 30) {
          // up to ~60s if interval=2s
          timer = setTimeout(() => setRetries((r) => r + 1), 2000);
        } else {
          setStatus("error");
        }
      } catch {
        if (retries < 30) {
          timer = setTimeout(() => setRetries((r) => r + 1), 2000);
        } else {
          setStatus("error");
        }
      }
    };

    check();
    return () => clearTimeout(timer);
  }, [orderId, retries, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "pending" && (
        <div className="text-center">
          <p className="text-blue-600">We’re verifying your payment…</p>
          <p className="text-sm text-gray-500 mt-2">
            This can take up to a minute.
          </p>
        </div>
      )}
      {status === "completed" && (
        <div className="text-center">
          <p className="text-green-600 font-semibold text-lg">
            ✅ Payment Successful!
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your dashboard…
          </p>
        </div>
      )}
      {status === "failed" && (
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">
            ❌ Payment Failed
          </p>
          <p className="text-sm text-gray-500">
            You can try again from your plan page.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <p className="text-yellow-600 font-semibold text-lg">
            ⚠️ Unable to verify right now
          </p>
          <p className="text-sm text-gray-500">
            Please refresh or contact support.
          </p>
        </div>
      )}
    </div>
  );
}
