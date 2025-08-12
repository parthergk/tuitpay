import { IFeePayment } from "@repo/types";
import React from "react";
interface PropInf {
  fee: IFeePayment;
}
const FeeCard: React.FC<PropInf> = ({ fee }) => {
    
  return (
    <>
      {fee && (
          <div className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200 cursor-pointer">
            <h1>{new Date(fee.createdAt).toISOString().split('T')[0]}</h1>
        </div>
      )}
      </>
  );
};

export default FeeCard;
