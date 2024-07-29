import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../../../_handlers/webhook";
import { withEndpoint } from "~/app/api/helpers";
import { NEXT_URL, qstashClient } from "~/app/api/constants";

// using accelerator registration tally webhook
// with upstash since tally times out after 10 seconds
export const POST = webhookHandler<any>({
  type: SignatureTypes.Tally, // tally webhook
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const { "data.fields": fields } = utilContext;
    return await qstashClient.publishJSON({
      url: withEndpoint("/api/register/c1/tally/o", NEXT_URL),
      body: { fields },
    });
  },
});
