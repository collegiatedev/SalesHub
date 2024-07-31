import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../_handlers/webhook";
import { getFieldValue } from "../../helpers";
import { getLead } from "../../_utils/notion/getLead";
import { leadHelpers, updateLead } from "../../_utils/notion/updateLead";
import { c2Debrief } from "../../_utils/generator/c2Debrief";
import { Stages } from "../../_utils/notion/types";

export const POST = webhookHandler<C2Debrief>({
  required: { body: ["data.fields"] },
  handler: async (utilContext: any, req: NextRequest) => {
    const { "data.fields": fields } = utilContext;
    const debrief = parseTallyC2Debrief(fields);

    const lead = await getLead(debrief.id);

    // no need to await
    updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C2, Stages.C1, Stages.C0]),
    });
    c2Debrief({
      studentName: lead.name,
      infoId: lead.otherRefs.dbRef!, // unsafe, todo: throw errors;
      repName: debrief.repName,
      type: debrief.type,
      challenges: debrief.challenges,
      value: debrief.value,
      alternatives: debrief.alternatives,
    });

    return debrief;
  },
  type: SignatureTypes.Tally,
});

type C2Debrief = {
  id: string;
  fullname: string;
  type: string;
  repName: string;
  leadRepId: string;
  challenges: string;
  value: string;
  alternatives: string;
};
const parseTallyC2Debrief = (fields: any): C2Debrief => {
  const gfv = (label: string) => getFieldValue(label, fields);
  return {
    id: gfv("id"),
    fullname: gfv("fulname"),
    type: gfv("type"),
    repName: gfv("repName"),
    leadRepId: gfv("leadRepId"),
    challenges: gfv("challenges"),
    value: gfv("value"),
    alternatives: gfv("alternatives"),
  };
};
