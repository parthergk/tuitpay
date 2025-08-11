"use client";
import { IStudent } from "@repo/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<IStudent | null>(null);
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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Student Details</h1>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      {student && !isLoading && !errorMsg && (
        <div className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200">
          <div><span className="font-semibold">Name:</span> {student.name}</div>
          <div><span className="font-semibold">Class:</span> {student.class}</div>
          <div><span className="font-semibold">Subject:</span> {student.sub}</div>
          <div><span className="font-semibold">Contact:</span> {student.contact}</div>
          <div><span className="font-semibold">Monthly Fee:</span> {student.monthlyFee}</div>
          <div><span className="font-semibold">Join Date:</span> {student.joinDate ? new Date(student.joinDate).toLocaleDateString() : "N/A"}</div>
          <div><span className="font-semibold">Fee Day:</span> {student.feeDay}</div>
        </div>
      )}
    </div>
  );
};

export default Student;
