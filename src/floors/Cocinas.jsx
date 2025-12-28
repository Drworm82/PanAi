import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { getNPCForFloor } from "../npc/npcManager";
import NPCBubble from "../components/NPCBubble";

export default function Cocinas() {
  const [status, setStatus] = useState("loading");
  const [npc, setNpc] = useState(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        setStatus("blocked");
        return;
      }

      const { data: row } = await supabase
        .from("users")
        .select("premium")
        .eq("id", user.id)
        .single();

      if (row?.premium) {
        setStatus("allowed");
        setNpc(getNPCForFloor("cocinas"));
      } else {
        setStatus("blocked");
      }
    };

    check();
  }, []);

  const closeNpc = () => {
    npc?.onSeen();
    setNpc(null);
  };

  if (status === "loading") return <p>Cargando…</p>;

  if (status === "blocked") {
    return (
      <div style={{ padding: "32px" }}>
        <h1>Cocinas</h1>
        <p>Área premium.</p>
        <p>Necesitas cuenta premium para acceder.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      <h1>Cocinas</h1>
      <p>Acceso premium concedido.</p>

      {npc && (
        <NPCBubble
          npc={npc.npc}
          text={npc.text}
          onClose={closeNpc}
        />
      )}
    </div>
  );
}
