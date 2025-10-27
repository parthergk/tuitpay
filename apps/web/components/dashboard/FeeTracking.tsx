import React, { useEffect, useState } from "react";

interface FeeRecord {
  month: string;
  paidAmount: number;
  unpaid: number;
  overdue: number;
  paymentDate: string | null;
}

interface Student {
  name: string;
  feeRecords: FeeRecord[];
}

const studentsData: Student[] = [
  {
    name: "Gaurav Kumar",
    feeRecords: [
      {
        month: "August 2025",
        paidAmount: 1200,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-08-25",
      },
      {
        month: "September 2025",
        paidAmount: 1200,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-09-09",
      },
      {
        month: "October 2025",
        paidAmount: 0,
        unpaid: 1200,
        overdue: 0,
        paymentDate: null,
      },
    ],
  },
  {
    name: "Prachi Kumari",
    feeRecords: [
      {
        month: "August 2025",
        paidAmount: 1100,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-08-20",
      },
      {
        month: "September 2025",
        paidAmount: 0,
        unpaid: 1100,
        overdue: 0,
        paymentDate: null,
      },
      {
        month: "October 2025",
        paidAmount: 1100,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-10-10",
      },
    ],
  },
  {
    name: "Prachi Kumari",
    feeRecords: [
      {
        month: "August 2025",
        paidAmount: 1100,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-08-20",
      },
      {
        month: "September 2025",
        paidAmount: 0,
        unpaid: 1100,
        overdue: 0,
        paymentDate: null,
      },
      {
        month: "October 2025",
        paidAmount: 1100,
        unpaid: 0,
        overdue: 0,
        paymentDate: "2025-10-10",
      },
    ],
  },
];

const FeeTracking = () => {
  const [input, setInput] = useState("");

  const searchData =
    input === ""
      ? studentsData
      : studentsData.filter((student) =>
          student.name.toLowerCase().includes(input.toLowerCase())
        );

  return (
    <div>
      <input
        type="text"
        placeholder="Search students..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="py-1 px-2.5 sm:py-1.5 sm:px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      />
      <div className=" w-full mt-8 overflow-x-auto min-h-80 shadow-lg border border-white/50 rounded-lg">
        <div className=" w-full h-full p-4 min-w-[810px] md:min-w-[600px] sm:max-h-80 overflow-y-scroll space-y-3">
          {searchData.map((student, i) => (
            <table key={i} className="w-full border-collapse text-sm">
              <caption className="text-lg font-semibold mb-1 text-heading text-start">
                {student.name}
              </caption>
              <thead className=" text-start">
                <tr>
                  <th className="py-2 px-3 text-left">Month</th>
                  <th className="py-2 px-3 text-left">Paid Amount</th>
                  <th className="py-2 px-3 text-left">Unpaid</th>
                  <th className="py-2 px-3 text-left">Overdue</th>
                  <th className="py-2 px-3 text-left">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {student.feeRecords.map((fee, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-2 px-3">{fee.month}</td>
                    <td className="py-2 px-3 text-green-700 font-medium">
                      {fee.paidAmount ? `₹${fee.paidAmount}` : "-"}
                    </td>
                    <td className="py-2 px-3 text-yellow-700 font-medium">
                      {fee.unpaid ? `₹${fee.unpaid}` : "-"}
                    </td>
                    <td className="py-2 px-3 text-red-700 font-medium">
                      {fee.overdue ? `₹${fee.overdue}` : "-"}
                    </td>
                    <td className="py-2 px-3">
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
                  </tr>
                ))}
                <tr className="text-left ">
                  <th className="py-2 px-3">Total</th>
                  <th className="py-2 px-3">
                    ₹{student.feeRecords.reduce((s, r) => s + r.paidAmount, 0)}
                  </th>
                  <th className="py-2 px-3">
                    ₹{student.feeRecords.reduce((s, r) => s + r.unpaid, 0)}
                  </th>
                  <td className="py-2 px-3">
                    ₹
                    {student.feeRecords
                      .reduce((s, r) => s + r.overdue, 0)
                      .toLocaleString()}
                  </td>
                  <td className="py-2 px-3">—</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeTracking;
