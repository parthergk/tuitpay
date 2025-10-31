import React from "react";
import Header from "../../../components/nav/Header";
import Footer from "../../../components/LandingPage/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
