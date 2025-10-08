import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

interface Props {
  url: string;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<Props> = ({ url, title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, staggerChildren: 0.2, }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-[300px] p-3 bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-2xl shadow-black/10 border border-white/50 rounded-xl flex flex-col"
    >
      <div className="flex-1 min-h-0">
        <Image
          src={url}
          width={600}
          height={600}
          alt="img"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      <div className="flex flex-col space-y-3 mt-3 overflow-hidden">
        <h2 className="text-base md:text-lg lg:text-xl text-heading font-medium truncate">
          {title}
        </h2>
        <p className="text-sm md:text-[15px] lg:text-base leading-snug text-sub line-clamp-3">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
