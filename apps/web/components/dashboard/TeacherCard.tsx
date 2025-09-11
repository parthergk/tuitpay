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
  setIsOpnePlans
}) => {
  return (
    <div className=" hidden col-span-1 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] rounded-2xl shadow-md px-5 py-3 w-full max-w-sm border border-gray-200 md:flex flex-col gap-2 h-full max-h-[245px]">
      <h2 className="text-xl text-gray-800">{name}</h2>
      <p className="text-sm sm:text-base leading-snug text-[#475569]">{tuitionClassName}</p>

      <div className="text-sm leading-snug text-[#475569] space-y-1">
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

      <button className=" mt-2 px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm sm:text-base font-medium text-white rounded-md transition-colors cursor-pointer" onClick={()=>setIsOpnePlans(pre=>!pre)} >Upgrade Plan</button>
    </div>
  );
};
