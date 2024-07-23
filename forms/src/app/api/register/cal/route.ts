import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../_handlers/webhook";
import { getLead } from "../../_utils/notion/getLead";
import { getRep } from "../../_utils/notion/getRep";
import {
  Stages,
  Statuses,
  updateLead,
  leadHelpers,
} from "../../_utils/notion/updateLead";

// required: { body: ["data.fields"] },
// handler: async (utilContext: any, req: NextRequest) => {
//   const { "data.fields": fields } = utilContext;
//   // create lead in notion

// using accelerator registration tally webhook
export const POST = webhookHandler<any>({
  required: { body: ["payload"] },
  handler: async (utilContext: any, req: NextRequest) => {
    const { payload } = utilContext;

    const cal = parseCalPayload(payload);
    if (!cal.studentId) {
      // todo, save into debug log db
      console.log("no student id");
      return;
    }

    const lead = await getLead(cal.studentId);
    const rep = await getRep(cal.repId);

    await updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C0]),
      ...leadHelpers.setLatestMeeting(cal.startTime),
      ...leadHelpers.setStatus(Statuses.Ongoing),
      ...leadHelpers.setLeadRep(rep.pageId),
    });
  },
  type: SignatureTypes.Cal,
});

const parseCalPayload = (payload: any): CalPayload => {
  return {
    repId: payload.organizer.id.toString(),
    studentId: payload.responses.id.value,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
};

type CalPayload = {
  repId: string;
  // might be null, depending on flow
  // todo, save into debug log db
  studentId?: string;
  startTime: string;
  endTime: string;
};
