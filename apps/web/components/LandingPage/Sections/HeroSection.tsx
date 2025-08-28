import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
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
      <div className=" min-h-screen flex justify-center items-center ">
        <div className="w-full max-w-4xl mx-auto text-center z-20 px-4">
          <motion.h1
            initial={{ opacity: 0, transform: "translateY(60%) skewY(10deg)" }}
            animate={{ opacity: 1, transform: "translateY(0%) skewY(0deg)"}}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-[#0F172A] leading-snug sm:leading-tight md:leading-tight"
          >
            <span>Track Tuition Fees Easily.</span>
            <br />
            <span>Send Automated Fee</span> <span>Reminders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, transform: "translateY(100%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            transition={{
              ease: [0.08, 0.65, 0.53, 0.96],
              delay: 1,
              duration: 1,
            }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto"
          >
            A smart fee tracker built for local tuition teachers & coaching
            centers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: "translateY(100%)" }}
            animate={{ opacity: 1, transform: "translateY(0%)" }}
            transition={{
              ease: [0.08, 0.65, 0.53, 0.96],
              delay: 0.7,
              duration: 1,
            }}
            className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8"
          >
            <Link
              href="/register"
              className="px-6 py-2 rounded-full bg-[#F97316] text-white font-medium shadow-md hover:bg-[#ea580c] transition-colors duration-200"
            >
              Get Started
            </Link>
            <button className="px-6 py-2 rounded-full border border-[#6B7280] text-[#374151] hover:bg-[#f9fafb] transition-colors duration-200 hover:cursor-pointer">
              How it Works
            </button>
          </motion.div>
        </div>
      </div>

      <div className=" relative w-full">
        <div className=" w-full mx-auto px-5 max-w-6xl ">
          <div className="w-full p-2 border rounded-xl">
            <Image
              width={2800}
              height={1800}
              sizes="746px"
              alt="demo"
              src="/image/dashboard.png"
              className=" rounded-xl"
            />
          </div>
        </div>
        <div className="absolute w-full h-80 bg-gradient-to-t from-[#EAE2FF] via-30% via-[#EAE2FF]/90 to-transparent -bottom-5"></div>
      </div>
    </section>
  );
};

export default HeroSection;
