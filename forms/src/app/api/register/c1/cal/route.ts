import { NextRequest } from "next/server";
import { SignatureTypes } from "../../../_handlers/webhook";
import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { createC1Tasks } from "../../../_utils/generator/c1Tasks";
import { oauthHandler } from "../../../_handlers/oauth";
import { getFolder } from "../../../_utils/drive/getFolder";
import { Stages } from "~/app/api/_utils/notion/types";
import { INITIAL_CAL_STATUS } from "~/app/api/constants";

export const POST = oauthHandler<CalPayload>({
  type: SignatureTypes.Cal,
  useRedirect: false, // client facing, so don't redirect for oauth
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest, googleClient: any) => {
    const { payload } = utilContext;
    console.log("we here");

    const cal = parseCalPayload(payload);
    if (!cal.studentId) throw new Error("no student id");

    const lead = await getLead(cal.studentId);
    const rep = await getRep(cal.repId);
    const folder = await getFolder({
      authClient: googleClient,
      folderId: lead.otherRefs.folderRef as string,
    });

    await updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C0]),
      ...leadHelpers.setLatestMeeting(cal.startTime),
      ...leadHelpers.setStatus(INITIAL_CAL_STATUS),
      ...leadHelpers.setLeadRep(rep.pageId),
    });
    // no need to await the rest
    createC1Tasks({
      lead,
      folderLink: folder.data.webViewLink as string,
      calStartTime: cal.startTime,
      repPageId: rep.pageId,
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
  // might be null, depending on flow
  repId: string;
  studentId?: string;
  startTime: string;
  endTime: string;
};
