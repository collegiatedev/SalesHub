import { tallyInputHandler } from "~/app/api/_handlers/input";

// using Essay Editing Concentration tally form
export const POST = tallyInputHandler({
  route: "/api/register/c2/add/editing",
});
