import { stripeClient } from "../constants";
import { NEXT_URL, ParseDraft } from "~/app/constants";
import { ApiResponse, reqHandler } from "../_handlers";

type StripeUrl = { url: string };
export const POST = reqHandler<StripeUrl>({
  required: { body: ["drafts"] },
  handler: async (body) => {
    const drafts = body.drafts as ParseDraft;
    console.log("my drafts", drafts);
    // hard coded for now, generalize later
    const base_url = `${NEXT_URL}/essay`;
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Plq5jIE68sMiiB3pDTunDWx",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${base_url}/?success=true`,
      cancel_url: `${base_url}/?canceled=true`,
      automatic_tax: { enabled: true },
    });
    if (!session.url) throw new Error("No URL returned from Stripe");

    return { url: session.url };
  },
});
export type CheckoutResponse = ApiResponse<StripeUrl>;
