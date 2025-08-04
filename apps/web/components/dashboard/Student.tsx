import { useRouter } from "next/navigation";
import React from "react";

const Student = ({ student }) => {
  const router = useRouter();
  async function handleStudent (){
    router.push(`/student?id=${student._id}`);
  };

  return (
    <div className=" w-full mt-2 bg-gray-100 p-2 rounded-sm" onClick={handleStudent}>
      <h1>
        <span className=" font-medium">Name:</span> {student.name}
      </h1>
    </div>
  );
};

export default Student;
