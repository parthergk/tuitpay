import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-full h-full font-forum">
      <UserProfileProvider>
        <Header />
        {children}
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
