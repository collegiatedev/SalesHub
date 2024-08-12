import { stripeProd } from "../constants";
import { NEXT_URL, ParsedDrafts, SESSION_QUERY_KEY } from "~/app/constants";
import { ApiResponse, reqHandler } from "../_handlers";
import { calculateLineItems } from "./items";

type StripeUrl = { url: string };
export const POST = reqHandler<StripeUrl>({
  required: { body: ["drafts"], params: [SESSION_QUERY_KEY] },
  handler: async (parsed) => {
    const drafts = parsed.drafts as ParsedDrafts;
    const query_key = parsed[SESSION_QUERY_KEY];

    const line_items = calculateLineItems(drafts);
    const base_url = `${NEXT_URL}/essay`; // hard coded for now, generalize later

    const session = await stripeProd.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${base_url}/?success=true`,
      cancel_url: `${base_url}/cart/?canceled=true&${SESSION_QUERY_KEY}=${query_key}`,
      automatic_tax: { enabled: true },
    });

    if (!session.url) throw new Error("No URL returned from Stripe");
    return { url: session.url };
  },
});
export type CheckoutResponse = ApiResponse<StripeUrl>;
