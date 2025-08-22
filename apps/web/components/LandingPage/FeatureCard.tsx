import React from "react";
interface Props{
    url: string,
    title: string,
    desc: string
}
const FeatureCard:React.FC<Props> = ({url, title, desc}) => {
  return (
    <div className=" h-[400px] p-3 bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-2xl shadow-black/10 border border-white/50 rounded-xl">
      <div className=" flex flex-col justify-between gap-5 h-full">
        <div className=" border h-full">Image</div>
        <div className=" flex flex-col space-y-4 self-end">
          <h2 className=" text-base sm:text-lg md:text-xl font-medium">
            {title}
          </h2>
          <p className=" text-sm sm:text-base leading-snug text-[#4B5563]">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
