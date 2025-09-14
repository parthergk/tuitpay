import { useRouter } from "next/navigation";
import React from "react";

const Student = ({ name, id }: { name: string; id: string }) => {
  const router = useRouter();
  async function handleStudent() {
    router.push(`/student?id=${id}`);
  }

  return (
    <div
      className=" w-full mt-2 p-2 rounded-md bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-sm shadow-black/10 border border-white/50 hover:-translate-y-0.5 hover:shadow-lg transition-transform cursor-pointer"
      onClick={handleStudent}
    >
      <h4 className="text-xs md:text-[13px] lg:text-sm leading-snug text-[#1A1A1A]">
        {name}
      </h4>
    </div>
  );
};

export default Student;
