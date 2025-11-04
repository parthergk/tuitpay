import { BadgeCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import MarkAsPaid from "../student/MarkAsPaid";

interface RawFeeRecord {
  _id: string;
  amount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string | null;
  studentId: {
    _id: string;
    name: string;
  };
}

interface ProcessedFeeRecord {
  id: string;
  month: string;
  paidAmount: number;
  unpaid: number;
  overdue: number;
  paymentDate: string | null;
  status: "paid" | "pending" | "overdue";
  amount: number;
}

interface GroupedStudentData {
  [studentName: string]: ProcessedFeeRecord[];
}

const FeeTracking: React.FC = () => {
  const [feeRecords, setFeeRecords] = useState<GroupedStudentData>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openMark, setOpenMark] = useState(false);
  const [feeId, setFeeId] = useState("");

  const fetchRecord = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.SERVER_URL}/api/v1/dashboard/feeRecord`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        setError(result.error)
      }

      const groupedData = result.data.reduce(
        (acc: GroupedStudentData, record: RawFeeRecord) => {
          const studentName = record.studentId?.name || "Unknown Student";

          if (!acc[studentName]) acc[studentName] = [];

          acc[studentName].push({
            id: record._id,
            month: new Date(record.dueDate).toLocaleString("default", {
              month: "long",
            }),
            paidAmount: record.paidAmount || 0,
            unpaid: record.status === "pending" ? record.amount : 0,
            overdue: record.status === "overdue" ? record.amount : 0,
            amount: record.amount,
            status: record.status,
            paymentDate: record.paidDate?.split("T")[0] ?? null,
          });

          return acc;
        },
        {}
      );

      setFeeRecords(groupedData);
    } catch (err: any) {
      console.error("Error fetching fee records:", err);
      setError(err.message || "Something went wrong while fetching records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const filteredData = Object.entries(feeRecords).filter(([studentName]) =>
    studentName.toLowerCase().includes(input.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-10 text-slate-600 animate-pulse">
        Loading fee records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 p-2 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50 text-[#E53935]">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search students..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="py-1 px-2.5 sm:py-1.5 sm:px-3 border border-slate-300 rounded-md focus:outline-none"
      />

      {/* Records Table */}
      <div className=" w-full mt-8 overflow-x-auto min-h-80 ">
        <div className=" w-full h-full  px-2 min-w-[810px] md:min-w-[600px] sm:max-h-80 overflow-y-auto space-y-3">
          {filteredData.length !== 0 ? (
            filteredData.map(([studentName, records]) => (
              <table
                key={studentName}
                className="w-full border-collapse text-sm"
              >
                <caption className="text-lg font-semibold mb-1 text-heading text-start">
                  {studentName}
                </caption>

                <thead className="text-left border-b border-neutral-300">
                  <tr>
                    <th className="py-2 px-3">Month</th>
                    <th className="py-2 px-3">Paid Amount</th>
                    <th className="py-2 px-3">Unpaid</th>
                    <th className="py-2 px-3">Overdue</th>
                    <th className="py-2 px-3">Payment Date</th>
                    <th className="py-2 px-3">Mark as paid</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((fee, i) => (
                    <tr
                      key={i}
                      className="border-b border-neutral-300 last:border-none"
                    >
                      <td className="py-3 px-3 font-semibold">{fee.month}</td>
                      <td className="py-3 px-3 text-green-700 font-medium">
                        {fee.paidAmount ? `₹${fee.paidAmount}` : "-"}
                      </td>
                      <td className="py-3 px-3 text-yellow-700 font-medium">
                        {fee.unpaid ? `₹${fee.unpaid}` : "-"}
                      </td>
                      <td className="py-3 px-3 text-red-700 font-medium">
                        {fee.overdue ? `₹${fee.overdue}` : "-"}
                      </td>
                      <td className="py-3 px-3">
                        {fee.paymentDate
                          ? new Date(fee.paymentDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </td>
                      <td className="py-3 px-3 text-red-700 font-medium">
                        {
                          <button
                            disabled={fee.status.toLowerCase() === "paid"}
                            onClick={() => {
                              (setOpenMark(true), setFeeId(fee.id));
                            }}
                            className={` px-5 py-0.5 rounded-sm text-center hover:underline text-sm ${fee.status.toLowerCase() === "paid" ? "cursor-not-allowed bg-neutral-400 text-white " : "cursor-pointer bg-primary text-white"}`}
                          >
                            <BadgeCheck className=" h-5 w-5" />
                          </button>
                        }
                      </td>
                    </tr>
                  ))}

                  {/* Totals */}
                  <tr className=" text-heading">
                    <td className="py-3 px-3 font-semibold">Total</td>
                    <td className="py-3 px-3">
                      ₹
                      {records
                        .reduce((s, r) => s + r.paidAmount, 0)
                        .toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      ₹
                      {records
                        .reduce((s, r) => s + r.unpaid, 0)
                        .toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      ₹
                      {records
                        .reduce((s, r) => s + r.overdue, 0)
                        .toLocaleString()}
                    </td>
                    <td className="py-3 px-3">—</td>
                  </tr>
                </tbody>
              </table>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              No records found.
            </div>
          )}
        </div>
      </div>
      {openMark && (
        <MarkAsPaid
          setOpenMark={setOpenMark}
          feeId={feeId}
          fetchData={fetchRecord}
        />
      )}
    </div>
  );
};

export default FeeTracking;
