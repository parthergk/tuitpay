"use client"
import React from "react";
import { motion } from "motion/react";
import InfiniteMovingCards from "../InfiniteMovingCards";

const TestimonialSection = () => {
  const infiniteScrollCard = [
    { direction: "up", speed: "normal" },
    { direction: "down", speed: "normal" },
    { direction: "up", speed: "normal" },
  ];
  return (
    <section className="mt-5 w-full py-14 md:py-28 px-5">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="sm:text-lg md:text-xl text-primary">TESTIMONIALS</h3>
        <h1 className="text-[28px] sm:text-4xl mt-5 ">What Our Users Say</h1>
      </motion.div>

      <div className="w-full max-h-[600px] h-full relative overflow-hidden lg:mt-[72px]">
        {/* Top gradient fade */}
        <div className="absolute z-10 w-full h-48 bg-gradient-to-b from-[#EAE2FF] to-transparent"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {infiniteScrollCard.map((item, index) => (
            <InfiniteMovingCards key={index} direction={item.direction as "up" | "down"} speed={item.speed as "fast" | "normal" | "slow"} />
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 w-full h-36 bg-gradient-to-t from-[#EAE2FF] to-transparent"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;
