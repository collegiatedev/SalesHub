import { NextRequest } from "next/server";
import { qstashClient, NEXT_URL } from "../constants";
import { withEndpoint } from "../helpers";
import { SignatureTypes, webhookHandler } from "./webhook";

interface TallyInputHandler {
  route: string;
  parser?: (fields: unknown) => any;
  delay?: number;
}
export const tallyInputHandler = ({
  route,
  parser,
  delay = 0,
}: TallyInputHandler) => {
  return webhookHandler<Published>({
    type: SignatureTypes.Tally,
    required: { body: ["data.fields"] },
    handler: async (utilContext: any, _req: NextRequest) => {
      const fields = utilContext["data.fields"];
      const input = parser ? parser(fields) : fields;
      return await qstashPublish({ route, input, delay });
    },
  });
};

// no cal input handler, since cal routing is handled by singular webhook; see register/cal/route.ts

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
    // todo, switch from personal implementation to qstash sdk
    // see Error catching and security
    // https://upstash.com/docs/qstash/quickstarts/vercel-nextjs
    body: { input, secret: process.env.INTERNAL_SECRET },
    delay, // in seconds
  });
