import React from "react";

interface TeacherCardProps {
  name: string;
  email: string;
  phone: string;
  tuitionClassName: string;
  planType: string;
  planStatus: string;
  studentLimit: number;
  planActivatedAt: string;
  planExpiresAt: string;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  email,
  phone,
  tuitionClassName,
  planType,
  planStatus,
  studentLimit,
  planActivatedAt,
  planExpiresAt,
}) => {
  return (
    <div className="col-span-1 bg-white rounded-2xl shadow-md p-6 w-full max-w-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-3">{tuitionClassName}</p>

      <div className="text-sm text-gray-700 space-y-1">
        <p><span className="font-medium">Email:</span> {email}</p>
        <p><span className="font-medium">Phone:</span> {phone}</p>
        <p><span className="font-medium">Plan:</span> {planType} ({planStatus})</p>
        <p><span className="font-medium">Student Limit:</span> {studentLimit}</p>
        <p><span className="font-medium">Activated:</span> {new Date(planActivatedAt).toLocaleDateString()}</p>
        <p><span className="font-medium">Expires:</span> {new Date(planExpiresAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
