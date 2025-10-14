"use client"
import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";
import { StudentFormProvider } from "../../context/StudentFormProvider";
import { OpenPlanProvider } from "../../context/OpenPlanProvider";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();

  return (
    <main className=" w-full h-full font-forum">
      <UserProfileProvider>
        <StudentFormProvider>
          <OpenPlanProvider>
            {
              session.status=="unauthenticated" && <Header />
            }
            {children}
          </OpenPlanProvider>
        </StudentFormProvider>
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
