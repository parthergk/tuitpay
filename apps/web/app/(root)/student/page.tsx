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

  const [currentIndex, setCurrentIndex] = useState();
  const [openIndex ,setOpenIndex] = useState<number | null>(null);

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
    <div>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {student && fees.length > 0 && !isLoading && !errorMsg && (
        <div className=" grid grid-cols-2">
          <StudentCard key={student?._id.toString()} student={student} />
          <div className=" p-4">
            <h1 className="text-xl font-bold mb-4">Student Fee Record</h1>
            <div className=" flex flex-col space-y-5">
              {fees.map((fee, index) => (
                  <FeeCard key={index} fee={fee} index={index} openIndex={openIndex} onToggle={() => setOpenIndex(openIndex===index ? null:index)}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
