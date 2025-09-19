import React from "react";

const TestimonialsCard = () => {
  return (
    <div className="w-full p-3 bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-lg shadow-black/10 border border-white/50 rounded-xl">
      <p className="text-sm sm:text-base leading-snug text-sub">
        Easily track every student in one place. Add new students, update
        details, and manage without any hassle. With our intuitive student
        database, teachers can save time and focus more on teaching.
      </p>
      <div className=" flex items-center gap-5 mt-3 sm:mt-5">
        <div className=" bg-gray-500 h-12 w-12 sm:h-15 sm:w-15 rounded-full"></div>
        <div className=" flex flex-col space-y-0.5 sm:space-y-1">
          <h3 className=" text-lg md:text-xl">Jatin Sharma</h3>
          <span className="text-sub">Math</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
