"use client";
import { IPlan } from "@repo/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
}

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [isPopup, setIsPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/plan");
        const { plans } = await res.json();
        setPlans(plans);
      } catch (error) {
        console.log("Error fetching the plans");
      }
    };
    fetchProducts();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`/api/auth/check-user?email=${encodeURIComponent(data.email)}`);
      const resData = await res.json();

      if (resData.exists) {
        router.push("/login");
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gray-400 flex flex-col gap-5 p-4 m-2 rounded-lg">
        {plans.length === 0 ? (
          <div>No plans available</div>
        ) : (
          plans.map((plan) => {
            const isFree = plan.price === 0;
            return (
              <div
                key={plan._id.toString()}
                className="p-2 border flex flex-col gap-2 cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  if (isFree) {
                    setIsPopup(true);
                  } else {
                    router.push(`/plan/${plan._id}`);
                  }
                }}
              >
                <div>Plan Name: {plan.type}</div>
                <div>Plan Price: {plan.price}</div>
                <div>Plan Duration: {plan.durationDays}</div>
              </div>
            );
          })
        )}
      </div>
      <div className=" flex justify-center items-center">
        <button onClick={()=>setIsPopup(!isPopup)} className=" border px-2 cursor-pointer">Start Free</button>
      </div>
      {isPopup && (
        <div className="flex justify-center items-center gap-2 mt-3 border p-4 rounded-lg bg-white shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <label>Email:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border px-2"
            />
            <button type="submit" className="border px-4 bg-blue-500 text-white">
              Continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
