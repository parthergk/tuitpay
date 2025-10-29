import { signOut } from "next-auth/react";
import React from "react";
import { Crown, UserCircle2 } from "lucide-react";
import { useOpenPlan } from "../context/OpenPlanProvider";
import { useUserProfile } from "../context/UserProfileProvider";
import { useRouter } from "next/navigation";

interface ProfileProps {
  isShow: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: React.FC<ProfileProps> = ({ isShow }) => {
  const { setIsOpenPlans } = useOpenPlan();
  const { userDetail } = useUserProfile();
  const router = useRouter();

  return (
    <div
      className={`${
        isShow ? "block" : "hidden"
      } absolute -right-1 top-14 p-3 flex flex-col gap-1.5  bg-gradient-to-br from-[#F0F4FF] via-[#ebe3ff] to-[#f0ebfd] rounded-lg border border-gray-200 shadow-sm`}
    >
      <div className="flex flex-col items-center px-1 py-1 rounded-md transition-colors mb-1">
        <h1 className="text-lg sm:text-xl md:text-2xl text-heading self-start">
          {userDetail?.name} Gaurav Kumar
        </h1>
        <span className=" text-xs md:text-[13px] lg:text-sm text-sub">
          {userDetail?.email} gauravkumar81464@gmail.com
        </span>
      </div>

      <div
        onClick={() => router.push("/profile_settings")}
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-1.5 rounded-md transition-colors"
      >
        <UserCircle2 className="h-5 w-5 text-gray-600" />
        <h1 className="text-sm md:text-[15px] lg:text-base font-medium text-sub">
          Profile
        </h1>
      </div>

      {userDetail?.planType !== "pro" && (
        <div
          onClick={() => setIsOpenPlans((pre) => !pre)}
          className=" flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-1.5 py-1 rounded-md transition-colors"
        >
          <Crown className="h-5 w-5 text-gray-600" />

          <h1 className="text-sm md:text-[15px] lg:text-base font-medium text-sub">
            Upgrade
          </h1>
        </div>
      )}

      <button
        className=" mt-1 px-3 py-1 bg-primary hover:bg-[#ea580c] text-sm md:text-[15px] lg:text-base leading-snug text-white rounded-md transition-colors cursor-pointern"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
