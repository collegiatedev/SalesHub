import { tallyInputHandler } from "~/app/api/_handlers/input";

// using academic background tally webhook
export const POST = tallyInputHandler({
  route: "/api/register/c2/tally",
});
