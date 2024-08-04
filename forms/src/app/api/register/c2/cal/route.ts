import { getLead } from "../../../_utils/notion/getLead";
import { getRep } from "../../../_utils/notion/getRep";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { CalPayload } from "../../cal/route";

export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.Req,
  handler: async (input) => {
    const lead = await getLead(input.studentId);
    const rep = await getRep({ calId: input.repId });

    await updateLead(lead.pageId, {
      ...leadHelpers.setModuleRep(rep.pageId),
    });

    return input;
  },
});
