import { ApiResponse, webhookHandler } from "../_utils/handlers";
import { createLead, parseCreateLeadFields } from "../_utils/notion/createLead";

// create lead in notion, using accelerator registration webhook
export const POST = webhookHandler<CreatedFields>(
  { body: ["data.fields"] },
  async (utilContext: any) => {
    const { "data.fields": fields } = utilContext;
    const leadFields = parseCreateLeadFields(fields);
    const lead = await createLead(leadFields);

    return { lead };
  }
);

type CreatedLead = Awaited<ReturnType<typeof createLead>>;
type CreatedFields = {
  lead: CreatedLead;
};

export type HookHandlerResponse = ApiResponse<CreatedFields>;
