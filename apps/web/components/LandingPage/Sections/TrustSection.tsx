import Image from 'next/image';
import React from 'react'

const TrustSection = () => {
      const trusted = [
    { url: "/image/user/coaching.png", alt: "coaching" },
    { url: "/image/user/TuitClasses.png", alt: "tuitClasses" },
    { url: "/image/user/DeeTuitions.png", alt: "deeTuiyions" },
    { url: "/image/user/MathTuit.png", alt: "mathTuit" },
  ];
  return (
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
  )
}

export default TrustSection