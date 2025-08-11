import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface PropInter {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Inputs {
  name: string;
  class: string;
  sub: string;
  contact: string;
  monthlyFee: number;
  isActivate: boolean;
  joinDate: string;
  feeday: number;
}

const StudentForm: React.FC<PropInter> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMessage("");
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/v1/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          class: data.class,
          sub: data.sub,
          contact: data.contact,
          monthlyFee: Number(data.monthlyFee),
          isActivate: data.isActivate,
          joinDate: data.joinDate,
          feeday: Number(data.feeday),
        }),
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Student not added! Please try again");
      }
      setMessage(result.message || "Student added successfully!");
      reset();
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

        {/* Alerts */}
        {message && (
          <div className="bg-green-100 text-green-700 p-1 rounded mb-2">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-1 rounded mb-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block">Name *</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block">Class *</label>
            <input
              type="text"
              {...register("class", { required: "Class is required" })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.class && (
              <p className="text-red-500 text-xs">{errors.class.message}</p>
            )}
          </div>

          <div>
            <label className="block">Subject *</label>
            <input
              type="text"
              {...register("sub", { required: "Subject is required" })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.sub && (
              <p className="text-red-500 text-xs">{errors.sub.message}</p>
            )}
          </div>

          <div>
            <label className="block">Contact *</label>
            <input
              type="tel"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit number",
                },
              })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs">{errors.contact.message}</p>
            )}
          </div>

          <div>
            <label className="block">Monthly Fee *</label>
            <input
              type="number"
              {...register("monthlyFee", {
                required: "Monthly fee is required",
                min: { value: 1, message: "Fee must be > 0" },
              })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.monthlyFee && (
              <p className="text-red-500 text-xs">
                {errors.monthlyFee.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <input type="checkbox" {...register("isActivate")} />
            <label>Active</label>
          </div>

          <div>
            <label className="block">Join Date *</label>
            <input
              type="date"
              {...register("joinDate", { required: "Join date is required" })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.joinDate && (
              <p className="text-red-500 text-xs">{errors.joinDate.message}</p>
            )}
          </div>

          <div>
            <label className="block">Fee Day *</label>
            <input
              type="number"
              {...register("feeday", {
                required: "Fee day is required",
                min: { value: 1, message: "Must be 1-31" },
                max: { value: 31, message: "Must be 1-31" },
              })}
              className="border w-full px-2 py-1 rounded text-sm"
            />
            {errors.feeday && (
              <p className="text-red-500 text-xs">{errors.feeday.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-3 py-1 rounded w-full hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
