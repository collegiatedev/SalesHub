import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { createC1Tasks } from "../../../_utils/generator/c1Tasks";
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

    const [{ pageId: repPageId }, folder] = await Promise.all([
      getRep(cal.repId),
      getFolder({
        authClient: googleClient,
        folderId: lead.otherRefs.folderRef,
      }),
    ]);

    await Promise.all([
      updateLead(lead.pageId, {
        ...leadHelpers.setCompletedStages([Stages.C0]),
        ...leadHelpers.setLatestMeeting(cal.startTime),
        ...leadHelpers.setStatus(INITIAL_CAL_STATUS),
        ...leadHelpers.setLeadRep(repPageId),
      }),
      createC1Tasks({
        lead,
        repPageId,
        folderLink: folder.data.webViewLink as string,
        calStartTime: cal.startTime,
      }),
    ]);

    return cal;
  },
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
