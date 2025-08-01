import React from "react";

const Student = ({ name }) => {
  return (
    <div className=" w-full mt-2 bg-gray-100 p-2 rounded-sm">
      <h1>
        <span className=" font-medium">Name:</span> {name}
      </h1>
    </div>
  );
};

export default Student;
