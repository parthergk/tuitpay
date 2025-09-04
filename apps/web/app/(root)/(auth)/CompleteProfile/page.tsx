"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type ProfileInputs = {
  name: string;
  phone: string;
  tuitionClassName: string;
};

const CompleteProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInputs>({ mode: "onBlur" });

  const router = useRouter();

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const response = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Profile update failed.");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Class Name */}
        <div>
          <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
            Class Name <span className="text-red-500">*</span>
          </label>
          <input
            id="className"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tuitionClassName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("tuitionClassName", {
              required: "Class name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.tuitionClassName && (
            <p className="mt-1 text-sm text-red-600">{errors.tuitionClassName.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          } text-white`}
        >
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
