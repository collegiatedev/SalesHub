import { getLead, LeadFields } from "../../../_utils/notion/getLead";
import { getRep, RepFields } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { C1TaskParams, createC1Tasks } from "../../../_utils/generator/c1Tasks";
import { getFolder } from "../../../_utils/drive/getFolder";
import { Stages } from "~/app/api/_utils/notion/types";
import { INITIAL_CAL_STATUS } from "~/app/api/constants";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";

export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const cal = parseCalPayload(input);
    if (!cal.studentId) throw new Error("no student id");

    const lead = await getLead(cal.studentId);
    if (!lead || !lead.otherRefs.folderRef) throw new Error("invalid lead");

    const [rep, folder] = await Promise.all([
      getRep({ calId: cal.repId }),
      getFolder({
        googleClient,
        folderId: lead.otherRefs.folderRef,
      }),
    ]);

    const c1Params = parseC1TaskParams({
      lead,
      rep,
      time: cal.startTime,
      folderLink: folder.data.webViewLink as string,
    });

    await Promise.all([
      updateLead(lead.pageId, {
        ...leadHelpers.setCompletedStages([Stages.C0]),
        ...leadHelpers.setLatestMeeting(cal.startTime),
        ...leadHelpers.setStatus(INITIAL_CAL_STATUS),
        ...leadHelpers.setLeadRep(rep.pageId),
      }),
      createC1Tasks(c1Params),
    ]);

    return cal;
  },
});

interface ParseC1Params {
  lead: LeadFields;
  rep: RepFields;
  time: string;
  folderLink: string;
}
const parseC1TaskParams = ({
  lead,
  rep,
  time,
  folderLink,
}: ParseC1Params): C1TaskParams => ({
  studentName: lead.name,
  studentPageId: lead.pageId,
  repPageId: rep.pageId,
  studentId: lead.id,
  studentEmail: lead.contact.studentEmail,
  studentNumber: lead.contact.studentPhone,
  parentEmail: lead.contact.parentEmail,
  parentNumber: lead.contact.parentPhone,
  parentName: lead.contact.parentName,
  studentPhone: lead.contact.studentPhone,
  parentPhone: lead.contact.parentPhone,
  folderLink,
  time,
});

type CalPayload = {
  studentId?: string;
  repId: string;
  startTime: string;
  endTime: string;
};
const parseCalPayload = (payload: any): CalPayload => {
  return {
    repId: payload.organizer.id.toString(),
    studentId: payload.responses.id.value,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
};
