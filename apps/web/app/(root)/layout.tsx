import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";
import { StudentFormProvider } from "../../context/StudentFormProvider";
import { OpenPlanProvider } from "../../context/OpenPlanProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-full h-full font-forum">
      <UserProfileProvider>
        <StudentFormProvider>
          <OpenPlanProvider>
            <Header />
            {children}
          </OpenPlanProvider>
        </StudentFormProvider>
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
