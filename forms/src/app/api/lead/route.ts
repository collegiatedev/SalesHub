import { ApiResponse, reqHandler } from "../_handlers";
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
