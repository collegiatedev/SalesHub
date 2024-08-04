import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { getLead } from "~/app/api/_utils/notion/getLead";
import { backgroundInfo } from "~/app/api/_utils/generator/info";
import { TallyC2 } from "./i/route";

export const POST = outputHandler<TallyC2>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const lead = await getLead(input.id);
    if (!lead.otherRefs.dbRef) throw new Error("invalid lead");

    await backgroundInfo({
      ...input,
      studentName: lead.name,
      infoId: lead.otherRefs.dbRef,
    });

    return input;
  },
});
