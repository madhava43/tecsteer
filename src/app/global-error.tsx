"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#42034a", marginBottom: "12px" }}>
          Tecsteer
        </h1>
        <h2 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "12px" }}>
          Something went wrong
        </h2>
        <p style={{ color: "#666", maxWidth: "400px", marginBottom: "32px" }}>
          A critical error occurred. Our team has been notified. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            backgroundColor: "#42034a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
