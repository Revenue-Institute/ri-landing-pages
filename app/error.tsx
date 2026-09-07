"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08090a",
        color: "#F3F4F1",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20, marginBottom: 12, color: "#5BE0A5" }}>
          Something went wrong.
        </div>
        <button
          onClick={reset}
          style={{
            fontSize: 15,
            color: "#08090A",
            background: "#5BE0A5",
            border: 0,
            padding: "12px 24px",
            borderRadius: 100,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
