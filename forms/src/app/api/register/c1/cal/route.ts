import { NextRequest } from "next/server";
import { SignatureTypes } from "../../../_handlers/webhook";
import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { Stages } from "~/app/api/_utils/notion/types";
import { oauthHandler } from "~/app/api/_handlers/oauth";
import { getFolder } from "~/app/api/_utils/drive/getFolder";
import { INITIAL_CAL_STATUS } from "~/app/api/constants";
import createC1Tasks from "~/app/api/_utils/generator/c1Tasks"; // weird issue with this import, need to set as default export

export const POST = oauthHandler<CalPayload>({
  type: SignatureTypes.Cal,
  useRedirect: false, // client facing, so don't redirect for oauth
  required: { body: ["payload"] },
  handler: async (utilContext: any, _req: NextRequest, googleClient: any) => {
    const { payload } = utilContext;

    const cal = parseCalPayload(payload);
    if (!cal.studentId) throw new Error("no student id");

    const lead = await getLead(cal.studentId);
    const rep = await getRep(cal.repId);
    const folder = await getFolder({
      authClient: googleClient,
      folderId: lead.otherRefs.folderRef as string,
    });

    // no need to await the rest

    updateLead(lead.pageId, {
      ...leadHelpers.setCompletedStages([Stages.C0]),
      ...leadHelpers.setLatestMeeting(cal.startTime),
      ...leadHelpers.setStatus(INITIAL_CAL_STATUS),
      ...leadHelpers.setLeadRep(rep.pageId),
    });
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
  repId: string;
  // might be null, depending on flow
  // todo, save into debug log db
  studentId?: string;
  startTime: string;
  endTime: string;
};
