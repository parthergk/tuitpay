import { IStudent } from "@repo/types";
import React from "react";

interface PropInf {
  student: IStudent | null;
}

const StudentCard: React.FC<PropInf> = ({ student }) => {
  return (
    <div className="mt-12 max-h-72 hidden col-span-1 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] rounded-2xl shadow-md px-4 sm:px-5 py-4 sm:py-5 w-full border border-gray-200 md:flex flex-col gap-3">
      <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800">
        Student Details
      </h2>
      {student && (
        <div className="text-sm sm:text-base md:text-base leading-snug text-[#475569] space-y-1.5">
          <p>
            <span className="font-medium text-gray-700">Name:</span>{" "}
            {student.name}
          </p>
          <p>
            <span className="font-medium text-gray-700">Class:</span>{" "}
            {student.class}
          </p>
          <p>
            <span className="font-medium text-gray-700">Subject:</span>{" "}
            {student.sub}
          </p>
          <p>
            <span className="font-medium text-gray-700">Contact:</span>{" "}
            {student.contact}
          </p>
          <p>
            <span className="font-medium text-gray-700">Monthly Fee:</span>{" "}
            {student.monthlyFee}
          </p>
          <p>
            <span className="font-medium text-gray-700">Join Date:</span>{" "}
            {student.joinDate
              ? new Date(student.joinDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-medium text-gray-700">Fee Day:</span>{" "}
            {student.feeDay}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
