export default function CozyCard({ children }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "var(--radius-soft)",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "var(--shadow-soft)"
      }}
    >
      {children}
    </div>
  );
}
