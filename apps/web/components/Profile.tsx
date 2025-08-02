import { signOut } from "next-auth/react";
import React from "react";
import { useUserProfile } from "../context/UserProfileProvider";

interface ProfileProps {
  isShow: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ isShow }) => {
  const userContext = useUserProfile();

  console.log("Context", userContext.userDetail);
  
  return (
    <div
      className={`${
        isShow ? "block" : "hidden"
      } absolute -right-0 bg-white p-2 border flex flex-col items-start gap-2`}
    >
      <h1>Name: {userContext.userDetail?.name}</h1>
      <span>Email: {userContext.userDetail?.email}</span>
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
