import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useStudentForm,
} from "../../context/StudentFormProvider";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";

interface PropInter {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
}

interface FormInputs {
  contact: string;
  monthlyFee: number;
  joinDate: string;
  feeDay: number;
}

const StudentForm: React.FC<PropInter> = ({ isOpen, setIsOpen, fetchData }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  
  const {formData,currentStep, setCurrentStep} = useStudentForm();

  const onSubmit = async (data:FormInputs) => {
    const completeData = {...formData, ...data, isActivate: true}

    setMessage("");
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/v1/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(completeData),
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Student not added! Please try again");
      }
      setMessage(result.message || "Student added successfully!");
      fetchData();
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "Unexpected error occurred"
      );
    }
  };


  if (!isOpen) return null;

  console.log("Re-render");
  
  const nextStep = () => setCurrentStep((pre) => pre + 1);
  const preStep = () => setCurrentStep((pre) => pre - 1);

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-lg shadow-lg p-4 relative text-sm">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-1 mb-2">
          <h2 className="text-lg font-semibold">Add Student</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {currentStep === 1 && <FormStep1 nextStep={nextStep} />}
        {currentStep === 2 && (
          <FormStep2 previous={preStep} submintHandler={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default StudentForm;
