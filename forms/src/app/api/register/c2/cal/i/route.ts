import { inputHandler } from "~/app/api/_handlers/io";
import { SignatureTypes } from "~/app/api/_handlers/webhook";

export const POST = inputHandler({
  type: SignatureTypes.Cal,
  route: "/api/register/c2/cal/o",
});
