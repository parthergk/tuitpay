import React, { useState } from "react";
import { useStudentForm } from "../../context/StudentFormProvider";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import { X } from "lucide-react";

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
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { formData, currentStep, setCurrentStep, setFormData } =
    useStudentForm();

  const onSubmit = async (data: FormInputs) => {
    const completeData = { ...formData, ...data, isActivate: true };

    setMessage(null);
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
      setMessage({
        type: "success",
        text: result.message || "Student added successfully!",
      });
      setCurrentStep(1);
      setFormData({});
      fetchData();
      setTimeout(() => {
        setMessage(null);
        setIsOpen(false);
      }, 5000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Unexpected error occurred",
      });
    }
  };

  if (!isOpen) return null;

  const nextStep = () => setCurrentStep((pre) => pre + 1);
  const preStep = () => setCurrentStep((pre) => pre - 1);

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50  backdrop-blur-2xl px-2 rounded-lg">
      <div className="max-w-md w-full m-auto p-3 flex flex-col bg-gradient-to-bl from-[#E8DFFF] to-[#DDEBFF] border-l border-white/50 shadow-xl shadow-black/10 rounded-lg">
        <div className=" w-full flex justify-between items-center">
          <h2 className="text-xl md:text-2xl leading-snug text-heading">
            Add Student
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {message && (
          <div
            className={`py-1.5 px-4 mb-3 mt-1 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50
          ${message.type === "success" ? "text-[#0F9D58]" : "text-[#E53935]"}
          `}
          >
            {message.text}
          </div>
        )}

        {currentStep === 1 && <FormStep1 nextStep={nextStep} />}
        {currentStep === 2 && (
          <FormStep2 previous={preStep} submintHandler={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default StudentForm;
