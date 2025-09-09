import { useRouter } from "next/navigation";
import React from "react";

const Student = ({ student }) => {
  const router = useRouter();
  async function handleStudent() {
    router.push(`/student?id=${student._id}`);
  }

  return (
    <div
      className=" w-full mt-2 p-2 rounded-md bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-sm shadow-black/10 border border-white/50 hover:-translate-y-0.5 hover:shadow-lg transition-transform cursor-pointer"
      onClick={handleStudent}
    >
      <h4 className="text-sm sm:text-base leading-snug text-[#4B5563]">
        {student.name}
      </h4>
    </div>
  );
};

export default Student;
