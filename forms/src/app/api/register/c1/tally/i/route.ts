import { NextRequest } from "next/server";
import { SignatureTypes } from "../../../../_handlers/webhook";
import { withEndpoint } from "~/app/api/helpers";
import { oauthHandler } from "~/app/api/_handlers/oauth";
import { qstashClient } from "~/app/api/constants";

// using accelerator registration tally webhook
export const POST = oauthHandler<any>({
  type: SignatureTypes.Tally, // tally webhook
  useRedirect: false, // client facing, so don't redirect for oauth
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, _req: NextRequest, googleClient: any) => {
    const { "data.fields": fields } = utilContext;
    // create lead in notion
    const endpoint = withEndpoint(
      "/api/register/c1/tally/o",
      "https://a85f-50-230-201-134.ngrok-free.app"
    );
    const secret = process.env.My_SECRET;
    await qstashClient.publishJSON({
      url: endpoint,
      body: { fields },
    });

    return;
  },
});
