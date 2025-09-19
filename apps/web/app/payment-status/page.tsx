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

        if (retries < 10) {
          // up to ~60s if interval=2s
          timer = setTimeout(() => setRetries((r) => r + 1), 2000);
        } else {
          setStatus("error");
        }
      } catch {
        if (retries < 10) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EAE2FF]">
      {status === "pending" && (
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0F172A]">
            We’re verifying your payment…
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] mt-2">
            This can take up to a minute.
          </p>
        </div>
      )}
      {status === "completed" && (
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0F172A]">
            ✅ Payment Successful!
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] mt-2">
            Redirecting to your dashboard…
          </p>
        </div>
      )}
      {status === "failed" && (
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#0F172A]">
            ❌ Payment Failed
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] mt-2">
            You can try again from your plan page.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-yellow-600">
            ⚠️ Unable to verify right now
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] mt-2">
            Please refresh or contact support.
          </p>

          {/* Support Details */}
          <div className="mt-4 text-[#374151]">
            <p className="text-sm md:text-base">
              📧 Email:{" "}
              <a
                href="mailto:support@example.com"
              >
                support@example.com
              </a>
            </p>
            <p className="text-sm md:text-base">
              📞 Phone:{" "}
              <a
                href="tel:+911234567890"
              >
                +91 12345 67890
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
