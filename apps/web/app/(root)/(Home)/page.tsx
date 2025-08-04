"use client"
import { IPlan } from "@repo/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [plans, setPlans] = useState<IPlan[]>([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const data = await fetch("http://localhost:8080/api/v1/plan");
        const {plans} = await data.json();
        setPlans(plans);
      } catch (error) {
        console.log("error fetching the plans");
      }
    }
    fetchProducts();
  },[]);
  
  return (
    <div className="bg-gray-400 flex flex-col gap-5 p-4 m-2 rounded-lg">
    {plans.length === 0 ? (
      <div>No plans available</div>
    ) : (
      plans.map((plan) => (
        <Link
        key={plan._id.toString()}
          href={`/plan/${plan._id}`}

        >
        <div className="p-2 border flex flex-col gap-2">
          <div>Plan Name: {plan.type}</div>
          <div>Plan Price: {plan.price}</div>
          <div>Plan Duration: {plan.durationDays}</div>
        </div>
        </Link>
      ))
    )}
  </div>
  );
}
