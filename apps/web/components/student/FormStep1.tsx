import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStudentForm } from "../../context/StudentFormProvider";

interface FormInputs {
  name: string;
  class: string;
  subject: string;
}

const FormStep1 = ({ nextStep }: { nextStep: () => void }) => {
  const { formData } = useStudentForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: formData.name || "",
      class: formData.class || "",
      subject: formData.subject || "",
    },
  });
  const studentContext = useStudentForm();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    studentContext.setFormData({
      name: data.name,
      class: data.class,
      subject: data.subject,
    });
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-2"
    >
      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="name"
          className="block leading-snug text-[#334155] mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("name", { required: "Student name is required" })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="name"
          className="block leading-snug text-[#334155] mb-1"
        >
          Class <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("class", { required: "Class name is required" })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
        />
        {errors.class && (
          <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>
        )}
      </div>

      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="name"
          className="block leading-snug text-[#334155] mb-1"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("subject", { required: "Subject is required" })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm md:text-[15px] lg:text-base leading-snug text-white rounded-md transition-colors cursor-pointern self-end"
      >
        Next
      </button>
    </form>
  );
};

export default FormStep1;
