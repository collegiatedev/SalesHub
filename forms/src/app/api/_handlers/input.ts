import { NextRequest } from "next/server";
import { qstashClient, NEXT_URL } from "../constants";
import { withEndpoint } from "../helpers";
import { SignatureTypes, webhookHandler } from "./webhook";

interface TallyInputHandler {
  route: string;
  delay?: number;
}
export const tallyInputHandler = ({ route, delay = 0 }: TallyInputHandler) => {
  return webhookHandler<Published>({
    type: SignatureTypes.Tally,
    required: { body: ["data.fields"] },
    handler: async (utilContext: any, _req: NextRequest) => {
      const input = utilContext["data.fields"];
      return await qstashPublish({ route, input, delay });
    },
  });
};

// no cal input handler, since cal routing is handled by singular webhook; see register/route.ts

export const calInputHandler = ({ route, delay = 0 }: TallyInputHandler) => {
  return webhookHandler<Published>({
    type: SignatureTypes.Cal,
    required: { body: ["payload"] },
    handler: async (utilContext: any, _req: NextRequest) => {
      const input = utilContext["payload"];
      return await qstashPublish({ route, input, delay });
    },
  });
};

export type Published = Awaited<ReturnType<typeof qstashPublish>>;
export const qstashPublish = async ({
  route,
  input,
  delay = 0,
}: {
  route: string;
  input: any;
  delay?: number;
}) =>
  await qstashClient.publishJSON({
    url: withEndpoint(route, NEXT_URL),
    body: { input, secret: process.env.INTERNAL_SECRET },
    delay, // in ms
  });
