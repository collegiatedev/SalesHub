// app/api/checkout/routes.ts

import { NextRequest, NextResponse } from "next/server";
import { NEXT_URL, stripeClient } from "../constants";

import { reqHandler } from "../_handlers";

export const POST = reqHandler<any>({
  required: { params: ["line_items"] },
  handler: async ({ line_items }) => {
    // hard coded for now, generalize later
    const base_url = `${NEXT_URL}/essay`;

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${base_url}?success=true`,
      cancel_url: `${base_url}?cancel=true`,
    });
    if (!session.url) throw new Error("No URL returned from Stripe");

    return NextResponse.redirect(session.url);
  },
});
