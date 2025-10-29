import { createContext, ReactNode, useContext, useState } from "react";

interface Overdue {
  id: string;
  name: string;
  amount: number;
  daysOverdue: number;
  lastReminderAt: string;
}

interface OverdueContextType {
  overDues: Overdue[];
  setOverDues: React.Dispatch<React.SetStateAction<Overdue[]>>;
}

const OverDueContext = createContext<OverdueContextType | null>(null);

export const OverdueProvider = ({ children }: { children: ReactNode }) => {
  const [overDues, setOverDues] = useState<Overdue[]>([]);

  return (
    <OverDueContext.Provider value={{ overDues, setOverDues }}>
      {children}
    </OverDueContext.Provider>
  );
};

export const useOverDue = () => {
  const context = useContext(OverDueContext);
  if (!context) {
    throw new Error("useOverDue must be used within an OverdueProvider");
  }
  return context;
};
