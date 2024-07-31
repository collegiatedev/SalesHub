import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";

export const POST = outputHandler<any>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    console.log("/c2/add/editing", input);
    return input;
  },
});
