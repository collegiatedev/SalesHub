import { ApiResponse, reqHandler } from "../_utils/handler";
import { getLead, LeadFields } from "./notion";

export const GET = reqHandler<LeadFields>(["id"], async (utilContext) => {
  const { id } = utilContext;

  const lead = await getLead(id as string);

  return { ...lead };
});
export type LeadHandlerResponse = ApiResponse<LeadFields>;
