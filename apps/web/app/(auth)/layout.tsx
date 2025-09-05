import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className=" w-full h-full font-forum">{children}</main>;
};

export default Layout;
