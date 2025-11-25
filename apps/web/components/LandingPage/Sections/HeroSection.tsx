"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";

const HeroSection = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const slideLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.2, duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 2, duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      ></div>
      <div className=" min-h-screen flex flex-col justify-center items-center pt-28 sm:pt-36 md:pt-48 gap-20 ">
        <div className="w-full max-w-4xl mx-auto text-center z-20 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-heading leading-tight md:leading-none">
            <motion.span
              variants={slideLeftVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className=" inline-block"
            >
              Track Tuition Fees Easily.
            </motion.span>
            <br />
            <motion.span
              variants={slideLeftVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
              className=" inline-block"
            >
              Send Automated Fee Reminders.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-sub max-w-2xl mx-auto"
          >
            A smart fee tracker built for local tuition teachers & coaching
            centers
          </motion.p>

          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8"
          >
            <Link
              href="/register"
              className="px-6 py-2 rounded-full bg-primary text-white font-medium shadow-lg hover:bg-[#ea580c] transition-colors duration-200"
            >
              Get Started
            </Link>
            <button className="px-6 py-2 rounded-full border border-[#6B7280] text-[#374151] hover:bg-[#f9fafb] transition-colors duration-200 hover:cursor-pointer">
              How it Works
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          ref={scrollRef}
          className=" relative w-full"
        >
          <div className=" w-full mx-auto px-5 max-w-6xl perspective-[1200px]">
            <motion.div
              style={{
                perspective: 1200,
                rotateX,
                scale,
              }}
              className="w-full rounded-xl"
            >
              <Image
                width={5120}
                height={2804}
                quality={100}
                unoptimized
                alt="demo"
                src="/image/dashboard.webp"
                className=" rounded-xl"
              />
            </motion.div>
          </div>
          <div className="absolute z-0 w-full h-80 bg-gradient-to-t from-[#EAE2FF]/95 via-30% via-[#EAE2FF] sm:via-[#EAE2FF]/60 to-transparent -bottom-40 sm:-bottom-36 md:-bottom-5"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
