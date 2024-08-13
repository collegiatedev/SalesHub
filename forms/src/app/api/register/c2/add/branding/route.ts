import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { createTemplate } from "~/app/api/_utils/drive/createTemplate";
import { brandingTasks } from "~/app/api/_utils/generator/brandingTasks";
import { getLead } from "~/app/api/_utils/notion/getLead";
import { getRep } from "~/app/api/_utils/notion/getRep";
import { BRANDING_DOC_TEMPLATE } from "~/app/api/constants";
import { CalPayload } from "../../../cal/route";

export const POST = outputHandler<CalPayload>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const lead = await getLead(input.studentId);
    if (!lead.pageRefs.leadRep) throw new Error("Invalid Lead, rep not set");

    const rep = await getRep({ pageId: lead.pageRefs.leadRep });

    const template = await createTemplate({
      title: `${lead.name}'s Personal Brand Planner`,
      templateId: BRANDING_DOC_TEMPLATE,
      googleClient,
      folderId: lead.otherRefs.folderRef as string,
    });

    await brandingTasks({
      leadRepId: rep.id,
      repName: rep.name,
      repPageId: rep.pageId,
      studentName: lead.name,
      time: input.startTime,
      studentId: lead.id,
      studentPageId: lead.pageId,
      pbDocLink: template.webViewLink as string,
      // dependent on lead rep completing task, so fallback exists for function call
      dashboardPageId: lead.pageRefs.dashboard as string,
    });

    return input;
  },
});
