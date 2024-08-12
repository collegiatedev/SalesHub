import { redirect } from "next/navigation";
import { CheckoutResponse } from "../api/essay/checkout/route";
import { ParsedDrafts, NEXT_URL, SESSION_QUERY_KEY } from "../constants";
import { PersonalInfo } from "../essay/cart/personal";

interface CheckoutOrderProps {
  drafts: ParsedDrafts;
  sessionId: string;
}
export const checkoutOrder = async ({
  drafts,
  sessionId,
}: CheckoutOrderProps) => {
  const response = await fetch(
    `${NEXT_URL}/api/essay/checkout/?${SESSION_QUERY_KEY}=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drafts }),
    }
  );

  const json = (await response.json()) as CheckoutResponse;
  if (!json.data?.url) throw new Error("No URL returned from Stripe");
  redirect(json.data.url);
};

interface GenerateDriveProps {
  drafts: ParsedDrafts;
  personal: PersonalInfo;
}
export const generateDrive = async ({
  drafts,
  personal,
}: GenerateDriveProps) => {
  try {
    // might want something to pass to checkout
    await fetch(`${NEXT_URL}/api/essay/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drafts, personal }),
    });
  } catch (error) {
    console.error(error);
  }
};
