// initial router for cal endpoints, using singular webhook

import { SignatureTypes, webhookHandler } from "~/app/api/_handlers/webhook";
import { NEXT_URL } from "../constants";
import { NextRequest } from "next/server";
import { withEndpoint } from "../helpers";
import { Published, qstashPublish } from "../_handlers/input";

export const POST = webhookHandler<Published | undefined>({
  type: SignatureTypes.Cal,
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const input = utilContext["payload"];

    const config = routeConfig(input.type);

    if (!config) return; // not a register cal route, so we're done

    return await qstashPublish({ ...config, input });
  },
});

type Config = {
  route: string;
  delay?: number;
};
// todo, revisit how cal links are being organized
const routeConfig = (type: string): Config | undefined => {
  const valid = (l: string[]) => l.includes(type);
  const endpoint = (r: string) => withEndpoint(r, NEXT_URL);

  if (valid(["c1"])) {
    return {
      route: endpoint("/api/register/c1/cal"),
      delay: 300, // longer than serverless timeout total
    };
  } else if (valid(["c2", "editing", "branding", "ec", "org", "internship"])) {
    return {
      route: endpoint("/api/register/c2/cal"),
    };
  } else if (valid(["c3", "c3-r", "c3-s", "c3-v"])) {
    return {
      route: endpoint("/api/register/c3/cal"),
    };
  }
  return;
};
