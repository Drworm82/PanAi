import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function RecipeForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const { error } = await supabase.from("recipes").insert({
      title,
      ingredients,
      steps,
      public: isPublic,
      author_id: user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setIngredients("");
    setSteps("");
    setIsPublic(true);

    if (onCreated) onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear receta</h3>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredientes"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        placeholder="Pasos"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Pública
      </label>

      <button type="submit">Guardar receta</button>
    </form>
  );
}
