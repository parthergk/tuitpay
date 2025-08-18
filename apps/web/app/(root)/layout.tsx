import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen min-h-screen bg-red-100 font-forum">
      <UserProfileProvider>
        <Header />
        {children}
      </UserProfileProvider>
    </main>
  );
};

export default Layout;
