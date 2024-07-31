import { inputHandler } from "~/app/api/_handlers/output";
import { SignatureTypes } from "~/app/api/_handlers/webhook";

// using academic background tally webhook
export const POST = inputHandler({
  type: SignatureTypes.Tally,
  route: "/api/register/c2/tally/o",
});
