// supabase/functions/create-checkout/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { user_id, email } = await req.json();

    if (!user_id || !email) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or email" }),
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: "Acceso Premium — Escuela de Repostería en el Árbol",
            },
            unit_amount: 9900, // $99.00 MXN
          },
          quantity: 1,
        },
      ],

      metadata: {
        user_id,
      },

      success_url: "https://pan-ai.vercel.app/cocinas",
      cancel_url: "https://pan-ai.vercel.app/recepcion",
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    console.error("create-checkout error:", err);
    return new Response(
      JSON.stringify({ error: "Stripe checkout failed" }),
      { status: 500 }
    );
  }
});
