import { ApiResponse, webhookHandler } from "../_utils/handlers";
import { createLead, parseCreateLeadFields } from "../_utils/notion/createLead";
import { createInfo } from "../_utils/axios/info";

// using accelerator registration webhook
export const POST = webhookHandler<CreatedFields>(
  { body: ["data.fields"] },
  async (utilContext: any) => {
    const { "data.fields": fields } = utilContext;
    // create lead in notion
    const leadFields = parseCreateLeadFields(fields);
    const lead = await createLead(leadFields);

    // call info/create and info/contact server endpoints
    const info = await createInfo(leadFields["Student Name"], lead.id);

    console.log(info);

    return { lead };
  }
);

type CreatedLead = Awaited<ReturnType<typeof createLead>>;
type CreatedFields = {
  lead: CreatedLead;
};

export type HookHandlerResponse = ApiResponse<CreatedFields>;
