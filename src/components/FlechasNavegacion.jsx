import CozyButton from "./CozyButton";

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
        background: "var(--color-paper)",
        borderTop: "2px solid var(--color-wood)",
      }}
    >
      <CozyButton onClick={onDown} disabled={!canDown}>
        ↓ Bajar
      </CozyButton>

      <div style={{ fontWeight: "600" }}>
        {label.toUpperCase()}
      </div>

      <CozyButton onClick={onUp} disabled={!canUp}>
        ↑ Subir
      </CozyButton>
    </div>
  );
}
