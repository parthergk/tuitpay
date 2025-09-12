"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface OpenPlanType {
  isOpenPlans: boolean;
  setIsOpenPlans: React.Dispatch<SetStateAction<boolean>>;
}

const OpenPlanContext = createContext<OpenPlanType | null>(null);

export const OpenPlanProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenPlans, setIsOpenPlans] = useState<boolean>(false);
  return (
    <OpenPlanContext.Provider value={{ isOpenPlans, setIsOpenPlans }}>
      {children}
    </OpenPlanContext.Provider>
  );
};

export const useOpenPlan = () => {
  const context = useContext(OpenPlanContext);
  if (!context) {
    throw new Error ("useOpnePlan must be used within a OpenPlanProvider");
  }
  return context;
};
