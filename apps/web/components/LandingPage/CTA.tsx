import React from 'react'

const CTA = () => {
  return (
      <section className="mt-5 w-full py-14 md:py-28 px-5">
        <div className="h-[400px] flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] drop-shadow-md">
              Get Started Today
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#4B5563]">
              Ready to experience the smarter way to manage and track fee — free
              to try.
            </p>
            <button className="mt-6 px-6 py-2 rounded-full bg-[#F97316] text-white hover:bg-[#ea580c] font-semibold shadow-md transition-colors duration-200 hover:cursor-pointer">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
  )
}

export default CTA