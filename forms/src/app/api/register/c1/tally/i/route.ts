import { tallyInputHandler } from "~/app/api/_handlers/input";
import { SignatureTypes } from "~/app/api/_handlers/webhook";

// using accelerator registration tally webhook
export const POST = tallyInputHandler({
  type: SignatureTypes.Tally,
  route: "/api/register/c1/tally/o",
});
