import React, { useState } from 'react'

const Students = () => {
    const [showForm, setShowForm] = useState(false);
    const handleAddStudent = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <div>Students</div>
  )
}

export default Students