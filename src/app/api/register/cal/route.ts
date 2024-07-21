import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../_handlers/webhook";

// using accelerator registration tally webhook
export const POST = webhookHandler<any>({
  required: {},
  handler: async (utilContext: any, req: NextRequest) => {
    console.log(req);
  },
  type: SignatureTypes.Cal,
});
