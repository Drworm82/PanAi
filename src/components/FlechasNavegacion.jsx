export default function FlechasNavegacion({
  onUp,
  onDown,
  canUp,
  canDown,
  label,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        borderTop: "1px solid #ccc",
      }}
    >
      <button onClick={onDown} disabled={!canDown}>
        ↓ Bajar
      </button>

      <div>{label.toUpperCase()}</div>

      <button onClick={onUp} disabled={!canUp}>
        ↑ Subir
      </button>
    </div>
  );
}
