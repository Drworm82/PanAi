// supabase/functions/verify-payment/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  { apiVersion: "2024-06-20" }
);

serve(async (req) => {
  // 1️⃣ Leer RAW BODY (obligatorio para Stripe)
  const rawBody = await req.text();

  // 2️⃣ Leer firma Stripe
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  // 3️⃣ Verificar evento Stripe (ASÍNCRONO — CRÍTICO)
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // 4️⃣ Solo manejar checkout.session.completed
  if (event.type !== "checkout.session.completed") {
    return new Response("Event ignored", { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_details?.email;

  if (!email) {
    return new Response("Missing customer email", { status: 400 });
  }

  // 5️⃣ Supabase ADMIN client
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // 6️⃣ Buscar usuario por email
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(error);
    return new Response("User lookup failed", { status: 500 });
  }

  const user = data.users.find(u => u.email === email);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // 7️⃣ Activar premium (CANON)
  const { error: updateError } =
    await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        premium: true,
        premium_activated_at: new Date().toISOString(),
        premium_source: "stripe_checkout",
      },
    });

  if (updateError) {
    console.error(updateError);
    return new Response("Failed to update user", { status: 500 });
  }

  console.log("✅ Premium activated for:", email);
  return new Response("OK", { status: 200 });
});
