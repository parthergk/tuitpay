import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface RawFeeRecord {
  amount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string | null;
}

interface FeeRecordContextType {
  feeRecords: RawFeeRecord[];
  setFeeRecords: React.Dispatch<React.SetStateAction<RawFeeRecord[]>>;
}

const FeeRecordContext = createContext<FeeRecordContextType | null>(null);

export const FeeRecordProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feeRecords, setFeeRecords] = useState<RawFeeRecord[]>([]);

  return (
    <FeeRecordContext.Provider value={{ feeRecords, setFeeRecords }}>
      {children}
    </FeeRecordContext.Provider>
  );
};

export const useFeeRecord = (): FeeRecordContextType => {
  const context = useContext(FeeRecordContext);
  if (!context) {
    throw new Error("useFeeRecord must be used within a FeeRecordProvider");
  }
  return context;
};
