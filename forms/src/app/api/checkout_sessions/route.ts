import { NextResponse } from "next/server";
import { stripeClient } from "../constants";
import { NEXT_URL } from "~/app/constants";
import { ApiResponse, reqHandler } from "../_handlers";

type StripeUrl = { url: string };
export const POST = reqHandler<StripeUrl>({
  required: { body: ["line_items"] },
  handler: async ({ line_items }) => {
    console.log("line_items", line_items);
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
      success_url: `${NEXT_URL}/?success=true`,
      cancel_url: `${NEXT_URL}/?canceled=true`,
      automatic_tax: { enabled: true },
    });
    if (!session.url) throw new Error("No URL returned from Stripe");

    return { url: session.url };
  },
});
export type CheckoutResponse = ApiResponse<StripeUrl>;

// export const POST = async (req: Request) => {
//   try {
//     // Create Checkout Sessions from body params.
//     // const b = await req.json();
//     const session = await stripeClient.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: "price_1Plq5jIE68sMiiB3pDTunDWx",
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${NEXT_URL}/?success=true`,
//       cancel_url: `${NEXT_URL}/?canceled=true`,
//       automatic_tax: { enabled: true },
//     });
//     if (!session.url) throw new Error("No URL returned from Stripe");
//     return { url: session.url };
//   } catch (err: any) {
//     console.log("error", err.message);
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     );
//   }
// };
