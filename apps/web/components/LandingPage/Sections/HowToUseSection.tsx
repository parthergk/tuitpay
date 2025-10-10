import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const HowToUseSection = () => {
  return (
    <section className="mt-5 w-full py-14 md:py-28 px-5">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className=" text-center"
      >
        <h3 className="sm:text-lg md:text-xl text-primary">HOW TO USE?</h3>
        <h1 className="text-[28px] sm:text-4xl mt-5 ">How it works?</h1>
      </motion.div>
      <div className=" grid md:grid-cols-2 gap-10 pt-16 lg:mt-[72px]">
        <div className=" h-full flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className=" flex flex-col relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full"
          >
            <div className="relative z-10 flex flex-col gap-2 sm:gap-3 p-6">
              <span className="sm:text-lg md:text-xl text-primary">STEP 1</span>
              <h1 className="text-lg sm:text-xl md:text-2xl font-medium truncate">
                Sign up in Minutes
              </h1>
              <p className="text-sm sm:text-base leading-snug text-sub line-clamp-3">
                Create your free account and set up your profile instantly. Our
                platform is designed for tuition teachers and coaching
                centers—no technical knowledge required.
              </p>
            </div>
            <div className="relative z-10 h-full w-full bg-amer-400 flex items-end justify-end group cursor-pointer">
              <Image
                src="/image/work/fst1.png"
                alt="sign-in"
                width={350}
                height={350}
                className=" w-52 sm:w-80 object-contain rounded-tl-lg transform origin-bottom-right transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="h-full w-full absolute z-0 opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_bottom_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-tl-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full"
          >
            <div className="relative z-10 flex flex-col gap-2 sm:gap-3 p-6">
              <span className="sm:text-lg md:text-xl text-primary">STEP 2</span>
              <h1 className="text-lg sm:text-xl md:text-2xl font-medium truncate">
                Add Students Easily
              </h1>
              <p className="text-sm sm:text-base leading-snug text-sub line-clamp-3">
                Quickly add student details such as name, contact, and fee
                schedule. Organize your batches and keep everything in one
                place.
              </p>
            </div>
            <div className="relative z-10 h-full w-full bg-amer-400 flex items-end justify-start group cursor-pointer">
              <Image
                src="/image/work/snd1.png"
                alt="sign-in"
                width={350}
                height={350}
                className=" w-56 sm:w-80 object-contain rounded-tr-lg transform origin-bottom-left transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="h-full w-full absolute z-0 opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_top_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-bl-full"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl"
        >
          <div className="relative z-10 flex flex-col gap-2 sm:gap-3 p-6">
            <span className="sm:text-lg md:text-xl text-primary">STEP 3</span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-medium truncate">
              Track Payments Seamlessly
            </h1>
            <p className="text-sm sm:text-base leading-snug text-sub line-clamp-3">
              Say goodbye to manual registers and missed reminders. With our
              system, you can track payments, pending fees, and due dates in
              real-time.
            </p>
          </div>
          <div className="relative z-10 h-full w-full bg-amer-400 flex items-center justify-start group cursor-pointer">
              <Image
                src="/image/work/trd1.png"
                alt="sign-in"
                width={350}
                height={750}
                className=" w-48 sm:w-72 object-contain rounded-tr-lg rounded-br-lg transform origin-left transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          <div className="h-full w-full absolute z-0 opacity-25 md:opacity-35 [background-image:linear-gradient(to_right_top,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
