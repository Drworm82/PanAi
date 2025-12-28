export default function CozyContainer({ children }) {
  return (
    <div
      style={{
        background: "var(--color-cream)",
        padding: "32px",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-soft)",
        maxWidth: "900px",
        margin: "24px auto"
      }}
    >
      {children}
    </div>
  );
}
