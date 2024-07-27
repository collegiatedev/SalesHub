import { NextRequest } from "next/server";
import { SignatureTypes, webhookHandler } from "../../../_handlers/webhook";
import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { Stages, Statuses } from "~/app/api/_utils/notion/types";
import {
  conductC1Task,
  createDashboardTask,
  createGCTask,
} from "~/app/api/_utils/generator/c1tasks";

// required: { body: ["data.fields"] },
// handler: async (utilContext: any, req: NextRequest) => {
//   const { "data.fields": fields } = utilContext;
//   // create lead in notion

// using accelerator registration tally webhook
export const POST = webhookHandler<CalPayload | boolean>({
  type: SignatureTypes.Cal,
  required: { body: ["payload"] },
  handler: async (utilContext: any, req: NextRequest) => {
    const { payload } = utilContext;

    const cal = parseCalPayload(payload);
    if (!cal.studentId) {
      // todo, save into debug log db
      console.log("no student id");
      return false;
    }

    const lead = await getLead(cal.studentId);
    const rep = await getRep(cal.repId);

    await updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C0]),
      ...leadHelpers.setLatestMeeting(cal.startTime),
      ...leadHelpers.setStatus(Statuses.Ongoing),
      ...leadHelpers.setLeadRep(rep.pageId),
    });

    // create task in accelerator tasks db
    conductC1Task({
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: lead.pageRefs.leadRep!,
      time: cal.startTime,
      studentId: lead.id,
      studentEmail: lead.contact.studentEmail,
      studentNumber: lead.contact.studentPhone,
      parentEmail: lead.contact.parentEmail,
      parentNumber: lead.contact.parentPhone,
    });
    createDashboardTask({
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: lead.pageRefs.leadRep!,
      time: cal.startTime,
      folderLink: lead.otherRefs.folderRef!, // todo, check if this is correct
      studentEmail: lead.contact.studentEmail,
    });
    createGCTask({
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: lead.pageRefs.leadRep!,
      time: cal.startTime,
      studentId: lead.id,
      parentName: lead.contact.parentName,
      studentPhone: lead.contact.studentPhone,
      parentPhone: lead.contact.parentPhone,
    });

    return cal;
  },
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
