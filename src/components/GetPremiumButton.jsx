const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function GetPremiumButton() {
  const handleClick = async () => {
    try {
      const res = await fetch(
        "https://isutvpkmboyaiuxovjic.functions.supabase.co/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data = await res.json();

      if (!data.url) {
        console.error("ERROR:", data);
        alert("Stripe no devolvió URL");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("CHECKOUT ERROR:", err);
      alert("Error iniciando pago");
    }
  };

  return <button onClick={handleClick}>Obtener Premium</button>;
}
