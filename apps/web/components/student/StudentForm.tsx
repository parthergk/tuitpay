import React from "react";

interface PropInter {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudentForm: React.FC<PropInter> = ({ isOpen, setIsOpen }) => {
  const handleCreateStudent = async () => {
    const studentData = {
      name: "Rohit Kumar",
      class: "11th",
      sub: "Hindi",
      contact: "7351500283",
      monthlyFee: 2500,
      isActivate: true,
      joinDate: new Date(),
      feeday: 23,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ data: studentData }),
      });

      const result = await response.json();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };
  return (
    <div
      className={`${isOpen ? "block" : "hidden"} absolute right-4 text-center border px-2 w-48 h-48 z-10 bg-white`}
    >
      <div className=" flex justify-between border-b pb-1">
        <button onClick={handleCreateStudent}>Submit</button>
        <span className=" cursor-pointer" onClick={() => setIsOpen(false)}>
          X
        </span>
      </div>
    </div>
  );
};

export default StudentForm;
