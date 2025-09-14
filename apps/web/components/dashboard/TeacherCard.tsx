import React from "react";

type TeacherCardProps = {
  name: string;
  email: string;
  phone: string;
  tuitionClassName: string;
  planType: string;
  planStatus: string;
  studentLimit: number;
  planActivatedAt?: Date;
  planExpiresAt?: Date;
  setIsOpnePlans: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  email,
  phone,
  tuitionClassName,
  planType,
  planStatus,
  studentLimit,
  planActivatedAt,
  planExpiresAt,
  setIsOpnePlans,
}) => {
  return (
    <div className=" hidden col-span-1 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] rounded-2xl shadow-md px-5 py-3 w-full max-w-sm border border-gray-200 md:flex flex-col gap-2 h-full max-h-[245px]">
      <h2 className="text-lg sm:text-xl md:text-2xl text-[#0F172A]">{name}</h2>

      <div className="text-xs md:text-[13px] lg:text-sm text-[#4B5563] leading-snug space-y-1">
        <p>
          <span className="font-medium">{tuitionClassName}</span>
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-medium">Plan:</span> {planType} ({planStatus})
        </p>
        <p>
          <span className="font-medium">Student Limit:</span> {studentLimit}
        </p>
        {planActivatedAt && (
          <p>
            <span className="font-medium">Activated:</span>{" "}
            {new Date(planActivatedAt).toLocaleDateString()}
          </p>
        )}
        {planExpiresAt && (
          <p>
            <span className="font-medium">Expires:</span>{" "}
            {new Date(planExpiresAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <button
        className=" mt-auto px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm md:text-[15px] lg:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
        onClick={() => setIsOpnePlans((pre) => !pre)}
      >
        Upgrade Plan
      </button>
    </div>
  );
};
