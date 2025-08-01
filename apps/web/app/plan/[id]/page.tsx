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
      const order = await response.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "TuitPay",
        description: `${plan.type}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          console.log("Razorpay success");
          router.push(`/payment-status?order_id=${response.razorpay_order_id}`);
        },
        prefill: {
          email: "gauravkumar81464@gmail.com",
        },
      }
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
      <button className=" border px-2 cursor-pointer" onClick={handlePurchase}>
        Purchase
      </button>
    </div>
  );
};

export default page;
