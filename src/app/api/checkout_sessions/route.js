import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const priceId = formData.get("priceId");
    const mode = formData.get("mode"); // ✅ এই line missing ছিল

    if (!priceId) {
      return NextResponse.json({ error: "priceId missing" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode, // ✅ এখন কাজ করবে
      success_url: `${process.env.BETTER_AUTH_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}