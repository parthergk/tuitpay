"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Plans from "../../../components/Plans";
import User from "../../../components/User";
import Link from "next/link";
import DashboardCard from "../../../components/LandingPage/DashboardCard";
import Image from "next/image";

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
    <div className="relative w-full min-h-screen flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <section className=" min-h-screen flex justify-center items-center ">
        <div className="w-full max-w-4xl mx-auto text-center z-20 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-[#0F172A] leading-snug sm:leading-tight md:leading-tight">
            Track Tuition Fees Easily. <br /> Send Automated Fee Reminders.
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto">
            A smart fee tracker built for local tuition teachers & coaching
            centers
          </p>

          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <Link
              href="/register"
              className="px-6 py-2 rounded-full bg-[#F97316] text-white font-medium shadow-md hover:bg-[#ea580c] transition-colors duration-200"
            >
              Get Started
            </Link>
            <button className="px-6 py-2 rounded-full border border-[#6B7280] text-[#374151] hover:bg-[#f9fafb] transition-colors duration-200">
              How it Works
            </button>
          </div>
        </div>
      </section>

      <section className=" relative w-full">
        <div className="w-full border max-w-[1200px] mx-auto">
          <Image
          width={2800}
          height={1800}
          sizes="746px"
          alt="demo"
          src="/image/dashboard.png"
          />
        </div>
        <div className="absolute w-full h-80 bg-gradient-to-t from-[#EAE2FF] via-30% via-[#EAE2FF]/90 to-transparent -bottom-5"></div>
      </section>

      <section className=" relative mt-5 w-full bg-[#EAE2FF] h-98 px-4">
        <div>We are trusted by</div>
      </section>
    </div>
  );
}
