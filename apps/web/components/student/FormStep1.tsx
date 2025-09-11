import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStudentForm } from "../../context/StudentFormProvider";

interface FormInputs {
  name: string;
  class: string;
  subject: string;
}

const FormStep1 = ({ nextStep }: { nextStep: () => void }) => {
const {formData} = useStudentForm();
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
    studentContext.updateFormValue({
        name: data.name,
        class: data.class,
        subject: data.subject,
      });
    nextStep();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        type="text"
        {...register("name", { required: "Student name is required" })}
      />
      {errors.name && <span>{errors.name.message}</span>}

      <label>Class</label>
      <input
        type="text"
        {...register("class", { required: "Class name is required" })}
      />
      {errors.class && <span>{errors.class.message}</span>}

      <label>Subject</label>
      <input
        type="text"
        {...register("subject", { required: "Subject is required" })}
      />
      {errors.subject && <span>{errors.subject.message}</span>}

      <button type="submit">Next</button>
    </form>
  );
};

export default FormStep1;
