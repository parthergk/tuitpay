import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type ProfileInputs = {
  name: string;
  email: string;
  phone: string;
  tuitionClassName: string;
};

interface Props{
  teacherInfo: ProfileInputs
}
const PersonalInfoCard:React.FC<Props> = ({teacherInfo}) => {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: teacherInfo.name,
      email: teacherInfo.email,
      phone: teacherInfo.phone,
      tuitionClassName: teacherInfo.tuitionClassName,
    },
  });

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      tuitionClassName: data.tuitionClassName,
      email: data.email,
    };
    try {
      const response = await fetch(`${process.env.CLIENT_URL}/api/user/profile`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Profile not updated please try again");
      }

      if (result.success) {
        reset({
          name: result.data.name,
          phone: result.data.phone,
          tuitionClassName: result.data.tuitionClassName,
        });
      }
      setMessage(result.message);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Please try again";
      setMessage(errorMsg);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message]);
  return (
    <div className=" w-full mt-6 rounded-lg p-5 bg-offwhite/50 backdrop-blur-sm shadow-xl">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-heading">
        Personal information
      </h1>
      {message && (
        <div className="w-full inline-flex items-center justify-center py-2 px-4 mt-3 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 hover:scale-[1.02] transition-transform">
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-3"
      >
        <div className=" w-full flex flex-col sm:flex-row gap-5">
          <div className=" w-full">
            <label
              htmlFor="name"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className=" w-full">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className=" flex flex-col sm:flex-row gap-5">
          <div className=" w-full">
            <label
              htmlFor="tuitionClassName"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Tuition Class Name <span className="text-red-500">*</span>
            </label>
            <input
              id="tuitionClassName"
              type="text"
              {...register("tuitionClassName", {
                required: "Class name is required",
                minLength: {
                  value: 2,
                  message: "At least 2 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.tuitionClassName ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.tuitionClassName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tuitionClassName.message}
              </p>
            )}
          </div>
          <div className=" w-full">
            <label
              htmlFor="phone"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.phone ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isDirty
              ? "bg-primary hover:bg-[#ea580c] active:bg-[#c2410c] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoCard;
