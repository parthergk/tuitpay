import React from "react";
import Header from "../../components/nav/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" w-screen">
      <Header />
      {children}
    </main>
  );
};

export default layout;
