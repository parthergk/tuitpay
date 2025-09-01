import React from "react";
import TestimonialsCard from "../Cards/TestimonialsCard";
import { motion } from "motion/react";
const TestimonialSection = () => {
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
      <div className="w-full relative pt-16 overflow-x-hidden lg:mt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-l from-[#EAE2FF] via-transparent to-[#EAE2FF]"></div>
        <div className="grid grid-cols-3 gap-6 min-w-max">
          {new Array(1, 2, 3, 4, 5, 6).map((item) => (
            <TestimonialsCard key={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
