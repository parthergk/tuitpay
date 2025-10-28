import React from "react";

const StudentsHeader = () => {
  const items = [
    "Name",
    "Contact",
    "Course",
    "Monthly Fee",
    "Join Date",
    "Due Date",
    "Status",
    "Actions",
  ];
  return (
    <div className=" w-full min-w-[800px] md:min-w-[590px] bg-primary text-white  px-4 py-3 rounded-tl-lg rounded-se-xl shadow-lg">
      <ul className=" grid grid-cols-8 gap-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsHeader;
