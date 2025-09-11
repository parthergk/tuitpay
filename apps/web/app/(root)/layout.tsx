import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";
import { StudentFormProvider } from "../../context/StudentFormProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-full h-full font-forum">
      <UserProfileProvider>
        <StudentFormProvider>
          <Header />
          {children}
        </StudentFormProvider>
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
