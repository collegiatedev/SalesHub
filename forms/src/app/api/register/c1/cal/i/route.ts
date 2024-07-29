import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../../../_handlers/webhook";
import { NEXT_URL, qstashClient } from "~/app/api/constants";
import { withEndpoint } from "~/app/api/helpers";

export const POST = webhookHandler<any>({
  type: SignatureTypes.Cal,
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const { payload } = utilContext;

    // const endpoint = withEndpoint("/api/register/c1/tasks", NEXT_URL);
    const endpoint = withEndpoint(
      "/api/register/c1/cal/o",
      "https://a85f-50-230-201-134.ngrok-free.app"
    );
    await qstashClient.publishJSON({
      url: endpoint,
      body: { payload, secret: process.env.My_SECRET },
      // we need to make sure that tally endpoint is fully completed, so we add delay longer than function timeout
      delay: 300,
    });

    return;
  },
});
