import { signOut } from "next-auth/react"; 
import React from "react";
import { useUserProfile } from "../context/UserProfileProvider";
import { Settings, UserCircle2 } from "lucide-react";

interface ProfileProps {
  isShow: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ isShow }) => {
  const userContext = useUserProfile();

  return (
    <div
      className={`${
        isShow ? "block" : "hidden"
      } absolute -right-1 top-14 p-3 flex flex-col gap-3 w-40 bg-gradient-to-br from-[#F0F4FF] via-[#ebe3ff] to-[#f0ebfd] rounded-lg border border-gray-200 shadow-sm`}
    >
      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-1.5 py-1 rounded-md transition-colors">
        <UserCircle2 className="h-6 w-6 text-gray-600"/>
        <h1 className="text-sm sm:text-base font-medium text-gray-700">
          Profile
        </h1>
      </div>
      <button
        className="px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm sm:text-base font-medium text-white rounded-md transition-colors"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
