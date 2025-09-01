import { CircleCheck } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlight = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`w-full p-6 rounded-2xl border shadow-lg shadow-black/10 border-white/50 transition-transform hover:scale-105 ${
        highlight
          ? "bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]"
          : "bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)]"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>

      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500 text-sm"> /month</span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CircleCheck className=" h-5 w-5 text-gray-600" />{" "}
            <span>{feature}</span>
          </li>
        ))}
        {highlight ? (
          <></>
        ) : (
          <>
            <li className="flex items-center gap-2">.</li>
            <li className="flex items-center gap-2">.</li>
          </>
        )}
      </ul>

      <button
        className={` self-end mt-6 w-full py-2 rounded-lg font-medium transition-colors  ${
          highlight
            ? "bg-primary hover:bg-[#EA580C] text-white" // Pro button (orange)
            : "bg-primary hover:bg-[#EA580C] text-white" // Free button (indigo)
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default PriceCard;
