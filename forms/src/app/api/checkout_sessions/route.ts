import { NextResponse } from "next/server";
import { stripeClient } from "../constants";

export const POST = async (req: Request) => {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Plq5jIE68sMiiB3pDTunDWx",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      automatic_tax: { enabled: true },
    });
    if (!session.url) throw new Error("No URL returned from Stripe");
    return NextResponse.redirect(session.url, 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
};
