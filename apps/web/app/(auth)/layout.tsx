import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-full h-full font-forum">
      {" "}
      <div className="w-full min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
        <div className="hidden md:flex flex-col items-center justify-center md:justify-start px-6 lg:px-12 max-w-72 lg:max-w-[546px] w-full h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-forum text-[#0F172A] leading-snug sm:leading-tight md:leading-tight">
            Set up Your <span>account</span> in seconds.
          </h1>

          <p className="mt-3 text-base md:text-lg text-[#4B5563] max-w-xs self-start">
            Start tracking fees instantly with a simple and smart setup process.
          </p>
        </div>

        {/* Form section */}
        <div className=" pt-5 sm:px-5 w-full h-screen bg-gradient-to-bl from-[#E8DFFF] to-[#DDEBFF] border-l border-white/50">
          {children}{" "}
        </div>
      </div>
    </main>
  );
};

export default Layout;
