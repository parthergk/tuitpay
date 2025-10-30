"use client";
import React from "react";
import { StudentFormProvider } from "../../context/StudentFormProvider";
import { OpenPlanProvider } from "../../context/OpenPlanProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className=" w-full h-full font-forum">
      <StudentFormProvider>
        <OpenPlanProvider>
          {children}
        </OpenPlanProvider>
      </StudentFormProvider>
    </main>
  );
};

export default Layout;