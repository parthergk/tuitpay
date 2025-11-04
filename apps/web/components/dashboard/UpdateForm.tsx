import { X } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  id: string;
  name: string;
  contact: string;
  class: string;
  monthlyFee: string;
  dueDate: string;
}

interface Props {
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormInputs | null;
  fetchData?: () => Promise<void>;
}

const UpdateForm: React.FC<Props> = ({ setIsUpdate, formData, fetchData }) => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: formData?.name || "",
      contact: formData?.contact || "",
      class: formData?.class || "",
      monthlyFee: formData?.monthlyFee || "",
      dueDate: formData?.dueDate || "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!formData?.id) {
      setMessage({ type: "error", text: "Error: Missing student ID." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch(
        `${process.env.SERVER_URL}/api/v1/student/${formData.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update student.");
      }

      const result = await response.json();
      setMessage({
        type: "success",
        text: result.message || "✅ Student updated successfully!",
      });

      if (fetchData) await fetchData();

      setTimeout(() => {
        setIsUpdate(false);
      }, 3000);
    } catch (error: any) {
      console.error("Update error:", error);
      setMessage({
        type: "error",
        text: `❌ ${error.message || "Something went wrong."}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-2xl px-2 rounded-lg">
      <div className="max-w-md w-full m-auto p-4 flex flex-col bg-gradient-to-bl from-[#E8DFFF] to-[#DDEBFF] border-l border-white/50 shadow-xl shadow-black/10 rounded-lg">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl md:text-2xl leading-snug text-heading">
            Update Student
          </h2>
          <button
            onClick={() => setIsUpdate(false)}
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2"
        >
          {/* Name */}
          <div className="text-sm md:text-[15px] sm:text-base">
            <label htmlFor="name" className="block text-[#334155] mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Student name is required" })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Contact */}
          <div className="text-sm md:text-[15px] sm:text-base">
            <label htmlFor="contact" className="block text-[#334155] mb-1">
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit contact number",
                },
              })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Class */}
          <div className="text-sm md:text-[15px] sm:text-base">
            <label htmlFor="class" className="block text-[#334155] mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("class", { required: "Class name is required" })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.class && (
              <p className="mt-1 text-sm text-red-600">
                {errors.class.message}
              </p>
            )}
          </div>

          {/* Monthly Fee */}
          <div className="text-sm md:text-[15px] sm:text-base">
            <label htmlFor="monthlyFee" className="block text-[#334155] mb-1">
              Monthly Fee <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("monthlyFee", {
                required: "Monthly fee is required",
                min: { value: 1, message: "Fee must be greater than 0" },
              })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.monthlyFee && (
              <p className="mt-1 text-sm text-red-600">
                {errors.monthlyFee.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="text-sm md:text-[15px] sm:text-base">
            <label htmlFor="dueDate" className="block text-[#334155] mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("dueDate", { required: "Due date is required" })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`px-3 py-1.5 bg-primary text-sm md:text-[15px] lg:text-base text-white rounded-md transition-all self-end ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-[#ea580c] cursor-pointer"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
