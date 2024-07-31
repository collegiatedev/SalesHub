import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";

export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const cal = parseCalPayload(input); // update cal
    if (!cal.studentId) throw new Error("no student id");
    const lead = await getLead(cal.studentId);
    if (!lead.otherRefs.folderRef) throw new Error("invalid lead");
    const rep = await getRep(cal.repId);

    await updateLead(lead.pageId, {
      ...leadHelpers.setModuleRep(rep.pageId),
    });

    // router time

    return cal;
  },
});

type CalPayload = {
  repId: string;
  studentId?: string;
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
