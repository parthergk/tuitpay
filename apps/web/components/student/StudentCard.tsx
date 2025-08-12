import { IStudent } from '@repo/types'
import React from 'react'
interface PropInf{
    student: IStudent | null
}
const StudentCard:React.FC<PropInf> = ({student}) => {
  return (
    <div  className="p-4">
        <h1 className="text-xl font-bold mb-4">Student Details</h1>

        {student && (
          <div className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200">
            <div>
              <span className="font-semibold">Name:</span> {student.name}
            </div>
            <div>
              <span className="font-semibold">Class:</span> {student.class}
            </div>
            <div>
              <span className="font-semibold">Subject:</span> {student.sub}
            </div>
            <div>
              <span className="font-semibold">Contact:</span> {student.contact}
            </div>
            <div>
              <span className="font-semibold">Monthly Fee:</span>{" "}
              {student.monthlyFee}
            </div>
            <div>
              <span className="font-semibold">Join Date:</span>{" "}
              {student.joinDate
                ? new Date(student.joinDate).toLocaleDateString()
                : "N/A"}
            </div>
            <div>
              <span className="font-semibold">Fee Day:</span> {student.feeDay}
            </div>
          </div>
        )}
      </div>
  )
}

export default StudentCard