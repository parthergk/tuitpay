import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen min-h-screen bg-red-100 font-forum">
      <UserProfileProvider>
        <Header />
        <div className="pt-20 px-4">{children}</div>
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
