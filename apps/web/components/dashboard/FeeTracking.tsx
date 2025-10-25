import React, { useState } from "react";

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
];

const FeeTracking = () => {
  const [options, setOptions] = useState("All Students");

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setOptions(e.target.value);
  }

  const selectedData =
    options === "All Students"
      ? studentsData
      : studentsData.filter((student) => student.name === options);
      
  return (
    <div>
      <select onChange={(e) => handleSelect(e)}>
        <option>All Studetns</option>
        {studentsData.map((item) => (
          <option key={item.name.toLowerCase()}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FeeTracking;
