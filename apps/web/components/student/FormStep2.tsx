import React, { useEffect } from "react";
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
    reset,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {" "}
        <label className="block">Contact *</label>{" "}
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
        />{" "}
        {errors.contact && (
          <p className="text-red-500 text-xs">{errors.contact.message}</p>
        )}{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block">Monthly Fee *</label>{" "}
        <input
          type="number"
          {...register("monthlyFee", {
            required: "Monthly fee is required",
            min: { value: 1, message: "Fee must be > 0" },
          })}
          className="border w-full px-2 py-1 rounded text-sm"
        />{" "}
        {errors.monthlyFee && (
          <p className="text-red-500 text-xs">{errors.monthlyFee.message}</p>
        )}{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block">Join Date *</label>{" "}
        <input
          type="date"
          {...register("joinDate", { required: "Join date is required" })}
          className="border w-full px-2 py-1 rounded text-sm"
        />{" "}
        {errors.joinDate && (
          <p className="text-red-500 text-xs">{errors.joinDate.message}</p>
        )}{" "}
      </div>{" "}
      <div>
        {" "}
        <label className="block">Fee Day *</label>{" "}
        <input
          type="number"
          {...register("feeDay", {
            required: "Fee day is required",
            min: { value: 1, message: "Must be 1-31" },
            max: { value: 31, message: "Must be 1-31" },
          })}
          className="border w-full px-2 py-1 rounded text-sm"
        />{" "}
        {errors.feeDay && (
          <p className="text-red-500 text-xs">{errors.feeDay.message}</p>
        )}{" "}
      </div>
      <button type="button" onClick={previous}>
        Previous
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormStep2;
