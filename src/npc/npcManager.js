import { npcDialogues } from "./npcDialogues";

const STORAGE_KEY = "npc_dialogues_seen";

function getSeen() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSeen(id) {
  const seen = getSeen();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen, id]));
}

export function getNPCForFloor(floor) {
  const pool = npcDialogues[floor];
  if (!pool || pool.length === 0) return null;

  const seen = getSeen();

  const unseen = pool.filter(d => !seen.includes(d.id));
  const candidates = unseen.length > 0 ? unseen : pool;

  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    ...selected,
    onSeen: () => saveSeen(selected.id)
  };
}
