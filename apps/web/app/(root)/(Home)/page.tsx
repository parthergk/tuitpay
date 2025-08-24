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
import FeatureCard from "../../../components/LandingPage/FeatureCard";
import TestimonialsCard from "../../../components/LandingPage/TestimonialsCard";

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

  const trusted = [
    { url: "/image/user/coaching.png", alt: "coaching" },
    { url: "/image/user/TuitClasses.png", alt: "tuitClasses" },
    { url: "/image/user/DeeTuitions.png", alt: "deeTuiyions" },
    { url: "/image/user/MathTuit.png", alt: "mathTuit" },
  ];

  const features = [
    {
      url: "/",
      title: "Smart Student Management",
      desc: "Easily track every student in one place. Add new students, update details, and manage without any hassle. With our intuitive student database, teachers can save time and focus more on teaching.",
    },
    {
      url: "/",
      title: "Automated Fee Reminders",
      desc: "The system sends smart WhatsApp and SMS reminders automatically before and after due dates. Teachers stay stress-free, while parents receive timely updates for hassle-free payments.",
    },
    {
      url: "/",
      title: "Instant UPI Payments",
      desc: "Collect tuition fees instantly through secure UPI-based payments. Every payment is logged in real time, ensuring accurate records and smooth transactions.",
    },
    {
      url: "/",
      title: "Fee Reports & Insights",
      desc: "Get a clear picture of your earnings with detailed fee reports and insights. Track pending, collected, and overdue payments, generate monthly reports.",
    },
    {
      url: "/",
      title: "Mobile-First Dashboard",
      desc: "Designed for teachers on the go. Our mobile-friendly dashboard works seamlessly on phones, tablets, and desktops, giving you the freedom to manage fees anytime, anywhere.",
    },
    {
      url: "/",
      title: "Secure & Private Data",
      desc: "Your data is 100% safe. With enterprise-grade security, all student and fee records are encrypted and accessible only to you. No third parties, no leaks—just complete privacy.",
    },
  ];

  return (
    <div className=" w-full min-h-screen flex flex-col bg-[#EAE2FF]">
      <section className="relative flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/image/noise.png')",
            backgroundSize: "128px",
            backgroundRepeat: "repeat",
          }}
        ></div>
        <div className=" min-h-screen flex justify-center items-center ">
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
        </div>

        <div className=" relative w-full">
          <div className=" w-full mx-auto px-5 max-w-6xl ">
            <div className="w-full p-2 border rounded-xl">
              <Image
                width={2800}
                height={1800}
                sizes="746px"
                alt="demo"
                src="/image/dashboard.png"
                className=" rounded-xl"
              />
            </div>
          </div>
          <div className="absolute w-full h-80 bg-gradient-to-t from-[#EAE2FF] via-30% via-[#EAE2FF]/90 to-transparent -bottom-5"></div>
        </div>
      </section>

      <section className="mt-5 w-ful py-14 md:py-28 px-5">
        <div className="w-full mt-5 flex flex-col justify-center gap-2 md:gap-4">
          <h1 className=" text-center sm:text-lg md:text-xl text-[#F97316]">
            WE ARE TRUSTED BY
          </h1>
          <div className=" w-full h-18 sm:h-24 md:h-36 flex justify-between items-center overflow-auto gap-5">
            {trusted.map((img) => (
              <div
                key={img.alt}
                className="w-full flex justify-center items-center"
              >
                <Image width={120} height={50} alt={img.alt} src={img.url} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 w-full py-14 md:py-28 px-5">
        <h3 className=" text-center sm:text-lg md:text-xl text-[#F97316]">
          FEATURES
        </h3>
        <h1 className=" text-center text-[28px] sm:text-4xl mt-5 ">
          Why Choose our Platform?
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-10 md:gap-y-15 pt-16 lg:mt-[72px]">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              url={feature.url}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </section>

      <section className="mt-5 w-full py-14 md:py-28 px-5">
        <h3 className=" text-center sm:text-lg md:text-xl text-[#F97316]">
          HOW TO USE?
        </h3>
        <h1 className=" text-center text-[28px] sm:text-4xl mt-5 ">
          How it works?
        </h1>
        <div className=" h-[1200px] grid md:grid-cols-2 gap-10 pt-16 lg:mt-[72px]">
          <div className=" h-full flex  flex-col gap-10">
            <div className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full">
              <div className="h-full w-full absolute opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_bottom_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-tl-full"></div>
            </div>
            <div className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl h-full">
              <div className="h-full w-full absolute opacity-20 md:opacity-35 [background-image:radial-gradient(circle_at_top_right,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)] rounded-bl-full"></div>
            </div>
          </div>
          <div className=" relative shadow-2xl shadow-black/10 border border-white/50 rounded-xl">
            <div className="h-full w-full absolute opacity-25 md:opacity-35 [background-image:linear-gradient(to_right_top,_#FFFFFF_0%,_#E0ECFF_25%,_#EAE2FF_50%,_#F8E8DB_75%,_#FFFFFF_100%)]"></div>
          </div>
        </div>
      </section>

      <section className="mt-5 w-full py-14 md:py-28 px-5">
        <h3 className=" text-center sm:text-lg md:text-xl text-[#F97316]">
          TESTIMONIALS
        </h3>
        <h1 className=" text-center text-[28px] sm:text-4xl mt-5 ">
          What Our Users Say
        </h1>
        <div className="w-full relative pt-16 overflow-x-hidden lg:mt-[72px]">
          <div className="absolute inset-0 bg-gradient-to-l from-[#EAE2FF] via-transparent to-[#EAE2FF]"></div>
          <div className="grid grid-cols-3 gap-6 min-w-max">
            {new Array(1, 2, 3, 4, 5, 6).map((item) => (
              <TestimonialsCard key={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
