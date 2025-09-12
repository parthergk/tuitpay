"use client";
import { IFeePayment, IStudent } from "@repo/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StudentCard from "../../../components/student/StudentCard";
import FeeCard from "../../../components/student/FeeCard";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<IStudent | null>(null);
  const [fees, setFees] = useState<IFeePayment[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) {
      setErrorMsg("No student ID provided");
      setIsLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/student/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Student not found. Please try again.");
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch student");
        }

        setStudent(data.studentData.student);
        setFees(data.studentData.fees);
      } catch (err) {
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Please try again or check your internet connection"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  return (
    <div className="h-screen px-5 pb-5 pt-24 bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)] flex flex-col">
      {" "}
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {student && fees.length > 0 && !isLoading && !errorMsg && (
        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 h-full pt-6 sm:pt-12">
          <StudentCard key={student?._id.toString()} student={student} />

          <div className=" overflow-hidden sm:col-span-2 flex flex-col bg-gradient-to-bl from-[#F0F4FF] via-[#ebe3ff]/50 to-[#f0ebfd] rounded-lg shadow-md p-4 ">
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800">
              Student Fee Record
            </h2>
            <div
              className="overflow-y-auto overflow-x-hidden flex flex-col gap-3 mt-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#f97316 #e5e7eb",
              }}
            >
              {fees.map((fee, index) => (
                <FeeCard
                  key={index}
                  fee={fee}
                  index={index}
                  openIndex={openIndex}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
