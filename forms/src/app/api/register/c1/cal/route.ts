import { getLead, LeadFields } from "../../../_utils/notion/getLead";
import { getRep, RepFields } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { C1TaskParams, createC1Tasks } from "../../../_utils/generator/c1Tasks";
import { getFolder } from "../../../_utils/drive/getFolder";
import { Stages } from "~/app/api/_utils/notion/types";
import { INITIAL_CAL_STATUS } from "~/app/api/constants";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { CalPayload } from "../../cal/route";

export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.OAuth_Outreach,
  handler: async (input, googleClient) => {
    const lead = await getLead(input.studentId);
    if (!lead.otherRefs.folderRef)
      throw new Error("invalid lead, missing folder");

    const [rep, folder] = await Promise.all([
      getRep({ calId: input.repId }),
      getFolder({
        googleClient,
        folderId: lead.otherRefs.folderRef,
      }),
    ]);

    const time = input.startTime;
    const folderLink = folder.data.webViewLink as string;
    const c1Params = parseC1TaskParams({ lead, rep, time, folderLink });

    // await Promise.all([
    //   createC1Tasks(c1Params),
    //   updateLead(lead.pageId, {
    //     ...leadHelpers.setCompletedStages([Stages.C0]),
    //     ...leadHelpers.setLatestMeeting(input.startTime),
    //     ...leadHelpers.setStatus(INITIAL_CAL_STATUS),
    //     ...leadHelpers.setLeadRep(rep.pageId),
    //   }),
    // ]);

    return input;
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
