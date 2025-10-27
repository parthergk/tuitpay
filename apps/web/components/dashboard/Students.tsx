import { BadgeCheck, Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import StudentsHeader from "./StudentsHeader";
import StudentForm from "../student/StudentForm";
import MarkAsPaid from "../student/MarkAsPaid";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";

interface FormInputs {
  id:string;
  name: string;
  contact: string;
  class: string;
  monthlyFee: string;
  dueDate: string;
}

interface SelectedStudent {
  id: string;
  name: string;
}

interface Student {
  _id: string;
  feeId: string;
  name: string;
  contact: number;
  sub: string;
  monthlyFee: string;
  feeDay: string;
  joinDate: string;
  status: string;
}

const Students = () => {
  const [showForm, setShowForm] = useState(false);
  const [openMark, setOpenMark] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormInputs | null>(null);
  const [feeId, setFeeId] = useState("");
  const [student, setStudent] = useState<SelectedStudent | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddStudent = () => {
    setShowForm((prev) => !prev);
  };
  const [students, setStudents] = useState<Student[]>([]);
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  async function fetchStudents() {
    const response = await fetch("http://localhost:8080/api/v1/student", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setStudents(result.studentWithStatus);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <div className=" flex justify-between items-center">
        <button
          onClick={handleAddStudent}
          className=" bg-primary text-white py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-md shadow-md cursor-pointer"
        >
          Add Student
        </button>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-1 px-2.5 sm:py-1.5 sm:px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className=" w-full mt-8 overflow-x-auto min-h-80 shadow-lg  border border-white/50 rounded-lg">
        <StudentsHeader />

        <div className=" w-full h-full p-4 min-w-[810px] md:min-w-[600px] sm:max-h-80 overflow-y-scroll">
          <ul className=" w-full space-y-3">
            {students.length > 0 ? (
              filteredStudents.map((student) => (
                <li
                  key={student._id}
                  className=" w-full grid grid-cols-8 gap-1 items-center border-b border-slate-100 pb-2 text-sm sm:text-base"
                >
                  <span className="truncate">{student.name}</span>
                  <span>{student.contact}</span>
                  <span className="truncate">{student.sub}</span>
                  <span>₹{student.monthlyFee}</span>
                  <span>{new Date(student.joinDate).toLocaleDateString()}</span>
                  <span className=" text-center">{student.feeDay}</span>
                  <div
                    className={` w-full max-w-20 sm:max-w-24 px-2 py-0.5 rounded-2xl text-center border ${
                      student.status.toLowerCase() === "paid"
                        ? "border-green-500 text-green-600"
                        : student.status.toLowerCase() === "pending"
                          ? "border-yellow-500 text-yellow-600"
                          : "border-red-500 text-red-600"
                    }`}
                  >
                    {student.status}
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={() => {
                        setFormData({
                          id: student._id,
                          name: student.name,
                          contact: student.contact.toString(),
                          class: student.sub,
                          monthlyFee: student.monthlyFee,
                          dueDate: student.feeDay,
                        });
                        setIsUpdate(true);
                      }}
                      className=" text-sub hover:underline text-sm cursor-pointer"
                    >
                      <Pen className=" h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsDelete(true);
                        setStudent({ id: student._id, name: student.name });
                      }}
                      className="text-red-600 hover:underline text-sm cursor-pointer"
                    >
                      <Trash2 className=" h-4 w-4" />
                    </button>
                    <button
                      disabled={student.status.toLowerCase() === "paid"}
                      onClick={() => {
                        (setOpenMark(true), setFeeId(student.feeId));
                      }}
                      className={`text-sub hover:underline text-sm ${student.status.toLowerCase() === "paid" ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <BadgeCheck className=" h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div className="animate-pulse space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-slate-200 rounded-md"></div>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
      <StudentForm
        isOpen={showForm}
        setIsOpen={setShowForm}
        fetchData={fetchStudents}
      />
      {isUpdate && (
        <UpdateForm
          setIsUpdate={setIsUpdate}
          formData={formData}
          fetchData={fetchStudents}
        />
      )}
      {openMark && (
        <MarkAsPaid
          setOpenMark={setOpenMark}
          feeId={feeId}
          fetchData={fetchStudents}
        />
      )}
      {isDelete && (
        <DeleteForm
          student={student}
          setIsDelete={setIsDelete}
          fetchData={fetchStudents}
        />
      )}
    </>
  );
};

export default Students;
