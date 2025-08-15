import { IPlan } from "@repo/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Plans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/plan");
        const { plans } = await res.json();
        setPlans(plans);
      } catch (error) {
        console.log("Error during the fetching the plan", error);
      }
    };
    fetchProducts();
  }, []);

  async function handlePurchase(plan:IPlan) {
    if (session.status === "unauthenticated") {
      router.push('/register');
      return;
    }
    if (!plan?._id) {
      console.log("Invalid product", "error");
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
        name: "FeeTrack",
        description: `${plan.type}`,
        order_id: order.orderId,
        handler: function () {
          router.push(`/payment-status?order_id=${order.orderId}`);
        },
        // modal: {
        //   ondismiss: function () {
        //     router.push(`/payment-status?order_id=${order.orderId}`);
        //   },
        // },
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
    <div className="bg-gray-400 flex gap-5 p-4 m-2 rounded-lg">
      {plans.length === 0 ? (
        <div>No plans available</div>
      ) : (
        plans.map((plan) => {
          return (
            <div
              key={plan._id.toString()}
              className="p-2 border flex flex-col gap-2 "
            >
              <div>Plan Name: {plan.type}</div>
              <div>Plan Price: {plan.price}</div>
              <div>Plan Duration: {plan.durationDays}</div>
              <button
                disabled={session.data?.user.plan === plan.type}
                className= {`border px-2  ${session.data?.user.plan === plan.type?  "bg-gray-100 cursor-not-allowed":"hover:bg-gray-300 cursor-pointer"}`}
                onClick={()=>handlePurchase(plan)}
              >
                {`${session.data?.user.plan === plan.type? "Your current plan": plan.type}`}

              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Plans;
