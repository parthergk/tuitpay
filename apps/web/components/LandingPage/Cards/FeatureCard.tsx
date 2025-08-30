import Image from "next/image";
import React from "react";

interface Props {
  url: string;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<Props> = ({ url, title, desc }) => {
  return (
    <div className="h-[400px] p-3 bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-2xl shadow-black/10 border border-white/50 rounded-xl flex flex-col">
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
        <h2 className="text-base sm:text-lg md:text-xl font-medium truncate">
          {title}
        </h2>
        <p className="text-sm sm:text-base leading-snug text-[#4B5563] line-clamp-3">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
