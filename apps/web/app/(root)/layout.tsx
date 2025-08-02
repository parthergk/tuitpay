import React from "react";
import UserProfileProvider from "../../context/UserProfileProvider";
import Header from "../../components/nav/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-screen">
      <UserProfileProvider>
        <Header />
        {children}
      </UserProfileProvider>
    </main>
  );
};

export default layout;
