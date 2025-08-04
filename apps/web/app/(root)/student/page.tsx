"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Student = () => {
  const searchParams= useSearchParams();
  const id = searchParams.get("id");
  console.log("Params", id);
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Student All Data</h1>
    </div>
  );
};

export default Student;
