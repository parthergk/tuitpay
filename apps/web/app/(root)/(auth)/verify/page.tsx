"use client";
import React, { useEffect, useRef, useState } from "react";

const Verify = () => {
  const [code, setCode] = useState<string[]>(new Array(4).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { code: code.join(""), email };
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

  function handleInputChange(value: string, index: number) {
    const newValue = value.trim();
    const newArray = [...code];
    newArray[index] = newValue;
    setCode(newArray);

    if (newValue && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && index > 0 && !(e.currentTarget.value)) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="shadow-lg w-md m-auto flex justify-center p-2 rounded-lg mt-5">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col justify-center items-center">
          <label className="text-center w-full border-b pb-2">OTP</label>
          <div className="grid grid-cols-4 gap-2 mt-5">
            {code.map((otp, index) => (
              <input
                key={index}
                ref={(el) => {inputsRef.current[index] = el}}
                maxLength={1}
                className="border h-10 w-10 text-center"
                value={otp}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className="mt-5 px-2 bg-gray-100 rounded-sm">Submit</button>
      </form>
    </div>
  );
};

export default Verify;
