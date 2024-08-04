import { getLead } from "../../_utils/notion/getLead";
import { leadHelpers, updateLead } from "../../_utils/notion/updateLead";
import { c1Debrief } from "../../_utils/generator/debriefs";
import { Stages } from "../../_utils/notion/types";
import { HandlerTypes, outputHandler } from "../../_handlers/output";
import { C1Debrief } from "./i/route";

export const POST = outputHandler<C1Debrief>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const lead = await getLead(input.id);
    if (!lead.otherRefs.dbRef) throw new Error("Invalid Lead, db not set");

    await Promise.all([
      updateLead(lead.pageId, {
        ...leadHelpers.setCompletedStages([Stages.C1, Stages.C0]),
      }),
      c1Debrief({
        studentName: lead.name,
        infoId: lead.otherRefs.dbRef,
        pronunciation: input.pronunciation,
        pronouns: input.pronouns,
        intended: input.intended,
        additional: input.additional,
        activities: input["ecs/activities"],
        plans: input["summer/winter plans"],
        profile: input["why now?"],
      }),
    ]);

    return input;
  },
});
