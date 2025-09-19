import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  contact: string;
  monthlyFee: number;
  joinDate: string;
  feeDay: number;
}

interface Props {
  previous: () => void;
  submintHandler: (data: FormInputs) => void;
}

const FormStep2: React.FC<Props> = ({ previous, submintHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    submintHandler({
      contact: data.contact,
      monthlyFee: Number(data.monthlyFee),
      joinDate: data.joinDate,
      feeDay: data.feeDay,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-2"
    >
      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="contact"
          className="block leading-snug text-[#334155] mb-1"
        >
          Contact <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register("contact", {
            required: "Contact is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit number",
            },
          })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.contact && (
          <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
        )}
      </div>

      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="monthlyFee"
          className="block leading-snug text-[#334155] mb-1"
        >
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

      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="joinDate"
          className="block leading-snug text-[#334155] mb-1"
        >
          Join Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          {...register("joinDate", {
            required: "Join date is required",
          })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.joinDate && (
          <p className="mt-1 text-sm text-red-600">{errors.joinDate.message}</p>
        )}
      </div>

      <div className="text-sm md:text-[15px] sm:text-base">
        <label
          htmlFor="feeDay"
          className="block leading-snug text-[#334155] mb-1"
        >
          Fee Day <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register("feeDay", {
            required: "Fee day is required",
            min: { value: 1, message: "Must be between 1 and 31" },
            max: { value: 31, message: "Must be between 1 and 31" },
          })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.feeDay && (
          <p className="mt-1 text-sm text-red-600">{errors.feeDay.message}</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={previous}
          className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-sm md:text-[15px] lg:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm md:text-[15px] lg:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormStep2;
