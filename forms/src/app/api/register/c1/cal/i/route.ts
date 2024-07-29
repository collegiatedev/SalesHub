import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../../../_handlers/webhook";
import { NEXT_URL, qstashClient } from "~/app/api/constants";
import { withEndpoint } from "~/app/api/helpers";

export const POST = webhookHandler<any>({
  type: SignatureTypes.Cal,
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const { payload } = utilContext;
    return await qstashClient.publishJSON({
      url: withEndpoint("/api/register/c1/cal/o", NEXT_URL),
      body: { payload, secret: process.env.INTERNAL_SECRET },
      delay: 300, // cal endpoint dependent on tally endpoint, so we add delay longer than serverless timeout total
    });
  },
});
