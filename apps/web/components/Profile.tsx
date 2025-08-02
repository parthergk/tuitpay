import { signOut } from "next-auth/react";
import React from "react";

interface ProfileProps {
  isShow: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ isShow }) => {
  return (
    <div
      className={`${
        isShow ? "block" : "hidden"
      } absolute -right-0 bg-white p-2 border flex flex-col items-start gap-2`}
    >
      <h1>Name: Gaurav</h1>
      <span>Email: gauravkumar81464@gmail.com</span>
      <button
        className="cursor-pointer border px-2 self-center-safe"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
