import React from "react";
import User from "../User";

const Header = () => {
  return (
    <header className=" h-12 bg-gray-400 m-2 rounded-lg flex p-2 items-center font-medium ">
      <nav className=" w-full flex justify-between items-center">
        <h1>Logo</h1>
        <User />
      </nav>
    </header>
  );
};

export default Header;
