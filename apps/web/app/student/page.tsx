"use client";
import React from 'react';

const Student = () => {
  const handleCreateStudent = async () => {
    const studentData = {
      name: 'Rohan Kumar',
      class: '11th',
      sub: 'Hindi',
      contact: '7351500283',
      monthlyFee: 2500,
      isActivate: true,
      joinDate: new Date(),
    };

    try {
      const response = await fetch('http://localhost:8080/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data: studentData }),
      });

      const result = await response.json();
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Create Student</h1>
      <button
        onClick={handleCreateStudent}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Dummy Student
      </button>
    </div>
  );
};

export default Student;
