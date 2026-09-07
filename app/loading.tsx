export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08090a",
      }}
    >
      <div
        className="pulse-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#5BE0A5",
        }}
      />
    </div>
  );
}
