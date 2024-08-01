import { tallyInputHandler } from "~/app/api/_handlers/input";

// using accelerator registration tally webhook
export const POST = tallyInputHandler({
  route: "/api/register/c1/tally",
});
