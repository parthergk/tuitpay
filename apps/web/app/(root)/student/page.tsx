"use client";
import { IFeePayment, IStudent } from "@repo/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StudentCard from "../../../components/student/StudentCard";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<IStudent | null>(null);
  const [fee, setFee] = useState<IFeePayment | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
        console.log("Data", data);

        setStudent(data.studentData.student);
        setFee(data.studentData.fees);
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
    <div className=" grid grid-cols-2">
      <StudentCard isLoading={isLoading} errMsg={errorMsg} student={student}/>
      <div className="p-4">

      </div>
    </div>
  );
};

export default Student;
