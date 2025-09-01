import React from "react";
import { motion } from "motion/react";

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
      <div className=" h-[1200px] grid md:grid-cols-2 gap-10 pt-16 lg:mt-[72px]">
        <div className=" h-full flex  flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full"
          >
            <div className="h-full w-full absolute opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_bottom_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-tl-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full"
          >
            <div className="h-full w-full absolute opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_top_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-bl-full"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl"
        >
          <div className="h-full w-full absolute opacity-25 md:opacity-35 [background-image:linear-gradient(to_right_top,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
