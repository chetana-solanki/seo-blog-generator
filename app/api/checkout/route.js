// API route to create Stripe checkout session for subscription
// https://stripe.com/docs/api/checkout/sessions/create
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

export async function POST(request) {
  try {
    const { priceId, userId } = await request.json(); // Get priceId and userId from request

    // Validate priceId is provided
    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL; // Get base URL from environment

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // Subscription mode (recurring payment)
      line_items: [{ price: priceId, quantity: 1 }], // Plan to subscribe to
      success_url: `${baseUrl}/view-plan`, // Redirect after successful payment
      cancel_url: `${baseUrl}/view-plan`, // Redirect if user cancels
      client_reference_id: userId || "unknown-user", // Track which user is subscribing
    });

    return NextResponse.json({ url: session.url }); // Return checkout URL
  } catch (err) {
    console.error("Stripe API Error:", err);
    const message = err?.message || String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
