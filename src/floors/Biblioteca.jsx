import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import RecipeForm from "../components/RecipeForm";
import { getNPCForFloor } from "../npc/npcManager";
import NPCBubble from "../components/NPCBubble";

export default function Biblioteca() {
  const [recipes, setRecipes] = useState([]);
  const [npc, setNpc] = useState(null);

  const loadRecipes = async () => {
    const { data } = await supabase
      .from("recipes")
      .select("*")
      .eq("public", true)
      .order("created_at", { ascending: false });

    setRecipes(data || []);
  };

  useEffect(() => {
    loadRecipes();
    setNpc(getNPCForFloor("biblioteca"));
  }, []);

  const closeNpc = () => {
    npc?.onSeen();
    setNpc(null);
  };

  return (
    <div style={{ padding: "32px" }}>
      <h1>Biblioteca</h1>

      {npc && (
        <NPCBubble
          npc={npc.npc}
          text={npc.text}
          onClose={closeNpc}
        />
      )}

      <RecipeForm onCreated={loadRecipes} />

      <h2>Recetas públicas</h2>
      {recipes.map(r => (
        <div key={r.id}>
          <h3>{r.title}</h3>
          <p>{r.ingredients}</p>
          <p>{r.steps}</p>
        </div>
      ))}
    </div>
  );
}
