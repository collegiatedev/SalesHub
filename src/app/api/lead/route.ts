import { ApiResponse, reqHandler, webhookHandler } from "../_utils/handlers";
import {
  CreatedLeadFields,
  createLead,
  parseCreateLeadFields,
} from "../_utils/notion/createLead";
import { getLead, LeadFields } from "../_utils/notion/getLead";

// get lead from notion, using id
export const GET = reqHandler<LeadFields>({
  required: { params: ["id"] },
  handler: async (utilContext) => {
    const { id } = utilContext;

    const lead = await getLead(id as string);

    return { ...lead };
  },
});
export type LeadHandlerResponse = ApiResponse<LeadFields>;

// create lead in notion

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
