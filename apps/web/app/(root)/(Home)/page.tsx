"use client";
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
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
  // useEffect(()=>{
  //   if (session.status==="authenticated") {
  //     router.push("/dashboard");
  //     return;
  //   }
  // },[])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`/api/auth/check-user?email=${encodeURIComponent(data.email)}`);
      const resData = await res.json();

      if (resData.exists) {
        router.push("/login");
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex justify-center items-center">
        <button onClick={()=>setIsPopup(!isPopup)} className=" border px-2 cursor-pointer">Start Free</button>
      </div>
      {isPopup && (
        <div className="flex justify-center items-center gap-2 mt-3 border p-4 rounded-lg bg-white shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <label>Email:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border px-2"
            />
            <button type="submit" className="border px-4 bg-blue-500 text-white">
              Continue
            </button>
          </form>
        </div>
      )}
      <Plans setIsPopup={setIsPopup}/>
    </div>
  );
}
