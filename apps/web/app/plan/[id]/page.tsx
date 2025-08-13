"use client";
import { IPlan } from "@repo/types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [plan, setPlan] = useState<IPlan | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/plan/${params.id}`
        );
        const { plan } = await response.json();
        setPlan(plan);
      } catch (error) {
        console.log("Error during the fetching the plan", error);
      }
    };

    fetchPlan();
  }, [params?.id]);

  async function handlePurchase() {
    if (plan?.type==="free") {
      router.push("/register");
      return;
    }
    if (!session) {
      console.log("Please login to make a purchase", "error");
      router.push("/login");
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
        name: "TuitPay",
        description: `${plan.type}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch(
            "http://localhost:8080/api/v1/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );
          const data = await verifyRes.json();
          console.log("Data", data);
          
          if (data.status === "completed") {
            router.push(
              `/payment-status?order_id=${order.orderId}&status=completed`
            );
          } else {
            router.push(
              `/payment-status?order_id=${order.orderId}&status=failed`
            );
          }
        },
        prefill: { email: session?.user?.email || "gauravkumar81464@gmail.com" },
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
    <div className=" w-screen h-screen bg-gray-700 text-white">
      <h1>{plan?.type}</h1>
      <p>Price: ₹{plan?.price}</p>
      <button className=" border px-2 cursor-pointer" onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default page;
