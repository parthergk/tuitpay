import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Prop {
  setOpenMark: React.Dispatch<React.SetStateAction<boolean>>;
  feeId: string;
  fetchData: () => Promise<void>;
}

interface FormValues {
  paidAmount: number;
}

const MarkAsPaid: React.FC<Prop> = ({ setOpenMark, feeId, fetchData }) => {
  const [message, setMessage] = useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/api/v1/status`, {
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
        setMessage({type:"error", text: resData.error || "Failed to update fee status"});
        return;
      }

      fetchData();
      setMessage({type: "success", text:"Fee marked as paid!"});
      setOpenMark(false);
    } catch (err) {
      console.error(err);
      setMessage({type: "error", text:"Failed to update fee status"});
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center backdrop-blur-2xl px-5">
      <div className="bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] backdrop-blur-sm p-3 sm:p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800">
          Mark as Paid
        </h2>
        {message && (
          <div
            className={`py-1.5 px-4 mb-3 mt-1 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50
          ${message.type === "success" ? "text-[#0F9D58]" : "text-[#E53935]"}
          `}
          >
            {message.text}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-2"
        >
          {/* Paid Amount */}
          <div>
            <label
              htmlFor="paidAmount"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Paid Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("paidAmount", { required: "Amount is required" })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {errors.paidAmount && (
              <p className="mt-1 text-sm text-red-600">
                {errors.paidAmount.message}
              </p>
            )}
          </div>

          {/* Paid Date */}
          <div>
            <label
              htmlFor="paidDate"
              className="block text-sm sm:text-base leading-snug text-[#334155] mb-1"
            >
              Paid Date
            </label>
            <input
              type="date"
              value={today}
              readOnly
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpenMark(false)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary hover:bg-[#ea580c] text-white rounded-md text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
