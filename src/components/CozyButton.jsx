export default function CozyButton({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        background: "var(--color-wood)",
        border: "none",
        borderRadius: "var(--radius-soft)",
        padding: "10px 18px",
        color: "var(--color-coffee)",
        boxShadow: "var(--shadow-soft)",
        fontWeight: "600"
      }}
    >
      {children}
    </button>
  );
}
