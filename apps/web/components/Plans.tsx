import { IPlan } from "@repo/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react"; // You can install lucide-react or use any other icon library

const Plans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/plan");
        const { plans } = await res.json();
        setPlans(plans);
      } catch (error) {
        console.log("Error during fetching plans", error);
      }
    };
    fetchPlans();
  }, []);

  async function handlePurchase(plan: IPlan) {
    if (session.status === "unauthenticated") {
      router.push("/register");
      return;
    }
    if (!plan?._id) {
      console.log("Invalid plan", "error");
      return;
    }

    const payload = {
      planId: plan._id,
      price: plan.price,
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Feexy",
        description: `${plan.type}`,
        order_id: order.orderId,
        handler: function () {
          router.push(`/payment-status?order_id=${order.orderId}`);
        },
        prefill: {
          email: session.data?.user.email,
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      console.log(
        error instanceof Error ? error.message : "Payment failed",
        "error"
      );
    }
  }

  return (
    <div className=" flex  items-center justify-center gap-6 p-4">
      {plans.length === 0 ? (
        <div className="text-center text-gray-500 col-span-full">
          No plans available
        </div>
      ) : (
        plans.map((plan) => {
          const isCurrent = session.data?.user.plan === plan.type;
          return (
            <div
              key={plan._id.toString()}
              className={`w-full max-w-sm p-4 rounded-2xl border shadow-lg shadow-black/10 border-white/50 transition-transform hover:scale-105 ${
                isCurrent
                  ? "bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]"
                  : "bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)]"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {plan.type}
              </h3>
              <p className="mt-2 text-gray-600">{plan.description}</p>

              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{plan.price}
                </span>
                <span className="text-gray-500 text-sm"> /month</span>
              </div>
              <p className="mt-2 text-gray-600">
                Duration: {plan.durationDays} days
              </p>

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-gray-600" />
                  Access to premium features
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-gray-600" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-gray-600" />
                  Regular updates
                </li>
              </ul>

              <button
                onClick={() => handlePurchase(plan)}
                disabled={isCurrent}
                className={` mt-6 w-full py-2 rounded-lg font-medium transition-colors ${
                  isCurrent
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary hover:bg-[#EA580C] text-white"
                }`}
              >
                {isCurrent ? "Your Current Plan" : "Subscribe"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Plans;
