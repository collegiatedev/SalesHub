import { ApiResponse, reqHandler } from "../_utils/handlers";
import { getLead, LeadFields } from "./getLead";

export const GET = reqHandler<LeadFields>({
  required: { params: ["id"] },
  handler: async (utilContext) => {
    const { id } = utilContext;

    const lead = await getLead(id as string);

    return { ...lead };
  },
});
export type LeadHandlerResponse = ApiResponse<LeadFields>;
