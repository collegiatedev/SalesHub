import { getLead } from "../../_utils/notion/getLead";
import { leadHelpers, updateLead } from "../../_utils/notion/updateLead";
import { c2Debrief } from "../../_utils/generator/debriefs";
import { Stages } from "../../_utils/notion/types";
import { HandlerTypes, outputHandler } from "../../_handlers/output";
import { C2Debrief } from "./i/route";
import { getRep } from "../../_utils/notion/getRep";

export const POST = outputHandler<C2Debrief>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const lead = await getLead(input.id);
    if (!lead.otherRefs.dbRef) throw new Error("Invalid Lead, db not set");
    const rep = await getRep({ pageId: input.leadRepId });

    await Promise.all([
      updateLead(lead.pageId, {
        ...leadHelpers.setCompletedStages([Stages.C2, Stages.C1, Stages.C0]),
      }),
      c2Debrief({
        studentName: lead.name,
        infoId: lead.otherRefs.dbRef,
        repName: rep.name,
        type: input.type,
        challenges: input.challenges,
        value: input.value,
        alternatives: input.alternatives,
      }),
    ]);

    return input;
  },
});
