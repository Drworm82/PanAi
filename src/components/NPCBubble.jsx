import { useState } from "react";

export default function NPCBubble({ npc, text, onClose }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    } else {
      onClose?.();
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <button onClick={handleClick}>
        {npc}
      </button>

      {open && (
        <div
          style={{
            border: "1px solid #333",
            padding: "12px",
            marginTop: "8px",
            maxWidth: "320px"
          }}
        >
          {text}
          <div>
            <button onClick={onClose} style={{ marginTop: "8px" }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
