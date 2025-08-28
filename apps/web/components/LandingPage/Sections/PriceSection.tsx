import React from 'react'
import PriceCard from '../Cards/PriceCard';

const PriceSection = () => {
      const plans = [
    {
      title: "Free",
      price: "₹0",
      description:
        "Best for individual tutors just starting with small batches of students.",
      features: [
        "Manage up to 20 students",
        "Track monthly fee payments",
        "Send WhatsApp reminders",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Pro",
      price: "₹499",
      description:
        "Perfect for coaching centers managing multiple teachers and larger student groups.",
      features: [
        "Unlimited students",
        "Auto payment tracking",
        "WhatsApp & SMS reminders",
        "Dashboard & reports",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro",
      highlight: true,
    },
  ];
  return (
      <section className="mt-5 w-full py-14 md:py-28 px-5">
        <h3 className=" text-center sm:text-lg md:text-xl text-[#F97316]">
          PRICINGS
        </h3>
        <h1 className=" text-center text-[28px] sm:text-4xl mt-5 ">
          Choose a Plan That Suits You
        </h1>
        <div className="w-full pt-16 lg:mt-[72px]">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {plans.map((plan, index) => (
              <PriceCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

  )
}

export default PriceSection