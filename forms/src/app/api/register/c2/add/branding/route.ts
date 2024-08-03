import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { createTemplate } from "~/app/api/_utils/drive/createTemplate";
import {
  BrandingTaskParams,
  brandingTasks,
} from "~/app/api/_utils/generator/brandingTasks";
import { getLead } from "~/app/api/_utils/notion/getLead";
import { getRep } from "~/app/api/_utils/notion/getRep";
import { BRANDING_DOC_TEMP } from "~/app/api/constants";

export const POST = outputHandler<any>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const studentId = input.responses.id.value as string;
    const lead = await getLead(studentId);
    if (!lead.pageRefs.leadRep) throw new Error("Lead rep not found");
    const rep = await getRep({ pageId: lead.pageRefs.leadRep });

    const template = await createTemplate({
      title: `${lead.name}'s Personal Brand Planner`,
      templateId: BRANDING_DOC_TEMP,
      googleClient,
    });

    const brandingTaskParams: BrandingTaskParams = {
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
    };

    await brandingTasks(brandingTaskParams);

    return input;
  },
});
