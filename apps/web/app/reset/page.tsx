"use client"
import React, { useState } from "react";

const Reset = () => {
  const [resetPassword, setResetPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {email, resetPassword };
    console.log("Register payload:", payload);
    try {
      const res = await fetch("/api/auth/reset", {
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
        <label>Password</label>
        <input
          type="text"
          value={resetPassword}
          onChange={(e) => setResetPassword(e.target.value)}
          />
          <br />
          <br />
          <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Reset;
