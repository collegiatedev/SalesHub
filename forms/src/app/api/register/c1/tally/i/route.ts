import { inputHandler } from "~/app/api/_handlers/io";
import { SignatureTypes } from "~/app/api/_handlers/webhook";

// using accelerator registration tally webhook
export const POST = inputHandler({
  type: SignatureTypes.Tally,
  route: "/api/register/c1/tally/o",
});
