"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#333", marginBottom: "12px" }}>
        Something went wrong
      </h2>
      <p style={{ color: "#666", maxWidth: "400px", margin: "0 auto 32px" }}>
        An unexpected error occurred. Please try again.
      </p>
      <button onClick={reset} className="btn-primary">
        Try Again
      </button>
    </main>
  );
}
