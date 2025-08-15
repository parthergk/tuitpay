import React from "react";
import { useForm } from "react-hook-form";

interface Prop {
  setOpenMark: React.Dispatch<React.SetStateAction<boolean>>;
  feeId: string;
  onMarkPaid: ( paidAmount: number, today:string) => void;
  
}

interface FormValues {
  paidAmount: number;
}

const MarkAsPaid: React.FC<Prop> = ({ setOpenMark, feeId, onMarkPaid }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          data: {
            feeId,
            status: "paid",
            paidAmount: data.paidAmount,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Please try again");
      }

      const resData = await response.json();
      if (!resData.status) {
        alert(resData.error || "Failed to update fee status");
        return;
      }

      if (today) {
          onMarkPaid(data.paidAmount, today);
      }
      alert("Fee marked as paid!");
      setOpenMark(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update fee status");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-lg font-semibold mb-4">Mark as Paid</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Paid Amount */}
          <div>
            <label className="block font-medium mb-1">Paid Amount</label>
            <input
              type="number"
              {...register("paidAmount", { required: "Amount is required" })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.paidAmount && (
              <p className="text-red-500 text-sm">
                {errors.paidAmount.message}
              </p>
            )}
          </div>

          {/* Paid Date */}
          <div>
            <label className="block font-medium mb-1">Paid Date</label>
            <input
              type="date"
              value={today}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpenMark(false)}
              className="border px-4 py-1 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Saving..." : "Mark Paid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkAsPaid;
