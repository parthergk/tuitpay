import React from 'react'
import TestimonialsCard from '../Cards/TestimonialsCard'

const TestimonialSection = () => {
  return (
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
  )
}

export default TestimonialSection