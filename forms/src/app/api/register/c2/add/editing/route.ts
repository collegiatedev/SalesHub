import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";

export const POST = outputHandler<any>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    console.log("/c2/add/editing", input);
    return input;
  },
});
