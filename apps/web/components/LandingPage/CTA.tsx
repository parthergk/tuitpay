import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CTA = () => {
  return (
    <section className="mt-5 w-full py-14 md:py-28 px-5">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="h-[400px] flex items-center justify-center text-center px-6"
      >
        <div className="max-w-2xl">
          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl font-forum text-heading mb-4"
          >
            Ready to Simplify Fee Management?
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-base md:text-lg text-sub"
          >
            Join hundreds of tutors who have already transformed how they manage payments.
          </motion.p>
          <motion.button
            variants={item}
            className="mt-6 px-6 py-2 rounded-full bg-primary text-white hover:bg-[#ea580c] font-semibold shadow-md transition-colors duration-200 hover:cursor-pointer"
          >
            <Link href="/register">Get Started for Free</Link>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
