// app/api/checkout/routes.ts

import { NextRequest, NextResponse } from "next/server";
import { stripeClient } from "../constants";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { line_items, success_url, cancel_url } = await req.json();

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url,
      cancel_url,
    });
    if (!session.url) throw new Error("No URL returned from Stripe");

    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error("Error creating Stripe Checkout Session:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the session." },
      { status: 500 }
    );
  }
}
