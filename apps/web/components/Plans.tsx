import { IPlan } from "@repo/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Plans = ({
  setIsPopup,
}: {
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [plans, setPlans] = useState<IPlan[]>([]);
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
  return (
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
  );
};

export default Plans;
