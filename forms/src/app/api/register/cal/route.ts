// router for handling cal endpoints, using singular webhook

import { SignatureTypes, webhookHandler } from "~/app/api/_handlers/webhook";
import { ENDPOINT_DELAY, NEXT_URL } from "../../constants";
import { NextRequest } from "next/server";
import { withEndpoint } from "../../helpers";
import { Published, qstashPublish } from "../../_handlers/input";

// todo, revisit how cal links are being organized
export const POST = webhookHandler<Array<Published>>({
  type: SignatureTypes.Cal,
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const input = utilContext["payload"];
    const publishing = publishEndpoints(input.type);
    return await Promise.all(
      publishing.map(async (config) => qstashPublish({ ...config, input }))
    );
  },
});

type Config = {
  route: string;
  delay?: number;
};
// orchestrates which endpoints gets called
const publishEndpoints = (type: string): Array<Config> => {
  const publishing: Array<Config> = [];
  const valid = (l: string[]) => l.includes(type);

  // specifically for /api/register endpoints
  const addEndpoint = (r: string, d?: number) =>
    publishing.push({
      route: withEndpoint(`/api/register${r}`, NEXT_URL),
      delay: d,
    });

  if (valid(["c1"])) addEndpoint("/c1/cal", ENDPOINT_DELAY);
  else if (valid(["c2", "branding", "editing", "ec", "org", "internship"])) {
    addEndpoint("/c2/cal");
    if (valid(["branding"])) addEndpoint("/c2/add/branding", ENDPOINT_DELAY);
    else if (valid(["editing"])) addEndpoint("/c2/add/editing", ENDPOINT_DELAY);
  } else if (valid(["c3", "c3-r", "c3-s", "c3-v"])) addEndpoint("/c3/cal");

  return publishing;
};
