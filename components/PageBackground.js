"use client";
import React from "react";

export default function PageBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-80 pointer-events-none"
      style={{
        backgroundImage: 'url("/background.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}