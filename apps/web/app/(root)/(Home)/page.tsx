"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Plans from "../../../components/Plans";

interface Inputs {
  email: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isPopup, setIsPopup] = useState(false);
  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(
        `/api/auth/check-user?email=${encodeURIComponent(data.email)}`
      );
      const resData = await res.json();

      router.push(resData.exists ? "/login" : "/register");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="absolute inset-0 z-0 w-full bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
      <div className="mt-24 flex flex-col items-center">
        {/* <button
          onClick={() => setIsPopup(!isPopup)}
          className="border px-4 py-2 rounded-md bg-white shadow hover:bg-gray-100 transition"
        >
          Start Free
        </button>

        {isPopup && (
          <div className="mt-4 flex justify-center items-center border p-4 rounded-lg bg-white shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <label className="flex items-center font-medium">Email:</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        <div className="mt-10 w-full max-w-4xl">
          <Plans />
        </div> */}
      </div>
    </div>
  );
}
