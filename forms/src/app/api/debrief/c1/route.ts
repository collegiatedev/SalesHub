import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../_handlers/webhook";
import { getFieldValue } from "../../helpers";
import { getLead } from "../../_utils/notion/getLead";
import { leadHelpers, updateLead } from "../../_utils/notion/updateLead";
import { c1Debrief } from "../../_utils/generator/c1Debrief";
import { Stages } from "../../_utils/notion/types";

export const POST = webhookHandler<C1Debrief>({
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, req: NextRequest) => {
    const { "data.fields": fields } = utilContext;
    const debrief = parseTallyC1Debrief(fields);

    const lead = await getLead(debrief.id);

    // no need to await
    updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C0, Stages.C1]),
    });
    c1Debrief({
      studentName: lead.name,
      infoId: lead.otherRefs.dbRef!, // unsafe, todo: throw errors
      activities: debrief["ecs/activities"],
      pronunciation: debrief.pronunciation,
      pronouns: debrief.pronouns,
      intended: debrief.intended,
      plans: debrief["summer/winter plans"],
      profile: debrief["why now?"],
      additional: debrief.additional,
    });

    return debrief;
  },
  type: SignatureTypes.Tally,
});

type C1Debrief = {
  id: string;
  pronunciation: string;
  pronouns: string;
  intended: string;
  "ecs/activities": string;
  "why now?": string;
  "summer/winter plans": string;
  additional: string;
};
const parseTallyC1Debrief = (fields: any): C1Debrief => {
  const gfv = (label: string) => getFieldValue(label, fields);
  return {
    id: gfv("id"),
    pronunciation: gfv("pronunciation"),
    pronouns: gfv("pronouns"),
    intended: gfv("intended"),
    "ecs/activities": gfv("ecs/activities"),
    "why now?": gfv("why now?"),
    "summer/winter plans": gfv("summer/winter plans"),
    additional: gfv("additional"),
  };
};
