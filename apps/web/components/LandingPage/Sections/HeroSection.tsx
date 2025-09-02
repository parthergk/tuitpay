import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HeroSection = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section className="relative flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-[#0F172A] leading-snug sm:leading-tight md:leading-tight">
            <motion.span
              initial={{
                opacity: 0,
                transform: "translateX(-10%)",
              }}
              animate={{ opacity: 1, transform: "translateX(0%)" }}
              transition={{ delay: 2, duration: 1 }}
              className=" inline-block"
            >
              Track Tuition Fees Easily.
            </motion.span>
            <br />
            <motion.span
              initial={{
                opacity: 0,
                transform: "translateX(-20%)",
              }}
              animate={{ opacity: 1, transform: "translateX(0%)" }}
              transition={{ delay: 2.3, duration: 0.8 }}
              className=" inline-block"
            >
              Send Automated Fee Reminders.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, transform: "translateY(100%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            transition={{
              delay: 2.5,
              duration: 0.8,
            }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto"
          >
            A smart fee tracker built for local tuition teachers & coaching
            centers
          </motion.p>

          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 2.7,
              duration: 0.7,
            }}
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
            initial={{ opacity: 0, transform: "translateY(100%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
          transition={{
              delay: 2.7,
              duration: 0.7,
            }}
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
              className="w-full p-2 border rounded-xl"
            >
              <Image
                width={2800}
                height={1800}
                sizes="746px"
                alt="demo"
                src="/image/dashboard.png"
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
