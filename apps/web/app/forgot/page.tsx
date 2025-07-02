"use client"
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

 async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { email };
    console.log("Register payload:", payload);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.json();
      console.log("Registration success:", data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label >Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword