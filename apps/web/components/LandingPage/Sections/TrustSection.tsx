import Image from "next/image";
import React from "react";

const TrustSection = () => {
  const trusted = [
    { url: "/image/user/coaching.png", alt: "coaching" },
    { url: "/image/user/TuitClasses.png", alt: "tuitClasses" },
    { url: "/image/user/DeeTuitions.png", alt: "deeTuiyions" },
    { url: "/image/user/MathTuit.png", alt: "mathTuit" },
  ];

  return (
    <section className="relative mt-5 w-full py-14 md:py-28 px-5">
      <div className="w-full mt-5 flex flex-col justify-center gap-2 md:gap-4">
        <h1 className="text-center sm:text-lg md:text-xl text-primary mb-10 sm:mb-12 md:mb-14">
          WE ARE TRUSTED BY
        </h1>
        
        <div className="w-full overflow-hidden [mask-image:var(--mask-gradient)] [-webkit-mask-image:var(--mask-gradient)]">
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {/* First set */}
            <div className="flex items-center shrink-0 justify-around min-w-full">
              {trusted.map((img, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16">
                  <Image 
                    width={120} 
                    height={50} 
                    alt={img.alt} 
                    src={img.url}
                    className="w-20 h-8 sm:w-24 sm:h-10 md:w-28 md:h-12 lg:w-32 lg:h-14 object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Second set for seamless loop */}
            <div className="flex items-center shrink-0 justify-around min-w-full">
              {trusted.map((img, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16">
                  <Image 
                    width={120} 
                    height={50} 
                    alt={img.alt} 
                    src={img.url}
                    className="w-20 h-8 sm:w-24 sm:h-10 md:w-28 md:h-12 lg:w-32 lg:h-14 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;