import { stripeClient } from "../constants";
import { NEXT_URL, ParsedDrafts } from "~/app/constants";
import { ApiResponse, reqHandler } from "../_handlers";
import { calculateLineItems } from "./items";

type StripeUrl = { url: string };
export const POST = reqHandler<StripeUrl>({
  required: { body: ["drafts"] },
  handler: async (body) => {
    const drafts = body.drafts as ParsedDrafts;
    const line_items = calculateLineItems(drafts);
    const base_url = `${NEXT_URL}/essay`; // hard coded for now, generalize later

    const session = await stripeClient.checkout.sessions.create({
      line_items,
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
