import React, { useEffect, useState } from "react";
import PriceCard from "../Cards/PriceCard";
import { motion } from "motion/react";
import { IPlan } from "@repo/types";

const PriceSection = () => {
  const [plans, setPlans] = useState<IPlan[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/plan`);
        const {plans} = await res.json();
        setPlans(plans);
      } catch (error) {
        console.log("Error during the fetching the plan", error);
      }
    };
    fetchProducts();
  }, [plans]);

   return (
    <section className="mt-5 w-full py-14 md:py-28 px-5">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className=" text-center sm:text-lg md:text-xl text-primary">
          PRICINGS
        </h3>
        <h1 className=" text-center text-[28px] sm:text-4xl mt-5 ">
          Choose a Plan That Suits You
        </h1>
      </motion.div>
      <div className="w-full pt-16 lg:mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {plans && plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
