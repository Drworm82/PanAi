import CozyContainer from "../components/CozyContainer";
import NPCBubble from "../components/NPCBubble";
import { useEffect, useState } from "react";
import { getNPCForFloor } from "../npc/npcManager";

export default function Exterior() {
  const [npc, setNpc] = useState(null);

  useEffect(() => {
    setNpc(getNPCForFloor("exterior"));
  }, []);

  const closeNpc = () => {
    npc?.onSeen();
    setNpc(null);
  };

  return (
    <CozyContainer>
      <h1>Exterior</h1>
      <p>La escuela descansa entre ramas, madera y pan recién hecho.</p>

      {npc && (
        <NPCBubble
          npc={npc.npc}
          text={npc.text}
          onClose={closeNpc}
        />
      )}
    </CozyContainer>
  );
}
