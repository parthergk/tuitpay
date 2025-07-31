"use client";
import React, { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:8080/api/v1/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Students", data);
    };
    getData();
  }, []);

  return <div>Dashboard</div>;
}
