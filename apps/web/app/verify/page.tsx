"use client"
import React, { useState } from "react";

const Verify = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { code, email };
    console.log("Register payload:", payload);
    try {
      const res = await fetch("/api/auth/verify", {
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
        <label>OTP</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
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

export default Verify;
