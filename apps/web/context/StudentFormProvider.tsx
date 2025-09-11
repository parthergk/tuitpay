"use client";
import React, { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

interface FormInputs {
  name?: string;
  class?: string;
  subject?: string;
  contact?: string;
  monthlyFee?: number;
  joinDate?: string;
  feeDay?: number;
}

interface FormDataType {
  formData: FormInputs
  updateFormValue: (data:FormInputs)=>void;
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>
}

const StudentFormContext = createContext<FormDataType | null>(null);

export const StudentFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormValue = (value:FormInputs)=>{
    setFormData((pre)=>({...pre, ...value}));
  }

  return (
    <StudentFormContext.Provider value={{ formData, currentStep, setCurrentStep, updateFormValue}}>
      {children}
    </StudentFormContext.Provider>
  );
};

export const useStudentForm = () => {
  const context = useContext(StudentFormContext);
  if (!context) {
    throw new Error("useStudentForm must be used within a StudentFormProvider");
  }
  return context;
};
