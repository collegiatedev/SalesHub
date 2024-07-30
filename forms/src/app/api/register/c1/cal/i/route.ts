import { inputHandler } from "~/app/api/_handlers/io";
import { SignatureTypes } from "~/app/api/_handlers/webhook";

// cal endpoint dependent on tally endpoint
// so we add delay longer than serverless timeout total
export const POST = inputHandler({
  type: SignatureTypes.Cal,
  route: "/api/register/c1/cal/o",
  delay: 300,
});
