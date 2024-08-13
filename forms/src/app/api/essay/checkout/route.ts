import { NEXT_URL, ParsedDrafts, SESSION_QUERY_KEY } from "~/app/constants";
import { ApiResponse, reqHandler } from "../../_handlers";
import { calculateLineItems } from "./items";
import { stripeClient } from "../../constants";

type StripeUrl = { url: string };
export const POST = reqHandler<StripeUrl>({
  required: { body: ["drafts"], params: [SESSION_QUERY_KEY] },
  handler: async (parsed) => {
    const drafts = parsed.drafts as ParsedDrafts;
    const query_key = parsed[SESSION_QUERY_KEY];

    const line_items = calculateLineItems(drafts);
    const session_param = `${SESSION_QUERY_KEY}=${query_key}`;
    const session = await stripeClient().checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${NEXT_URL}/api/essay/success?${session_param}`, // redirect api call to process transaction
      cancel_url: `${NEXT_URL}/essay/cart/?canceled=true&${session_param}`,
      automatic_tax: { enabled: true },
    });

    if (!session.url) throw new Error("No URL returned from Stripe");
    return { url: session.url };
  },
});
export type CheckoutResponse = ApiResponse<StripeUrl>;
