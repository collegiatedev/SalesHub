import { ApiResponse, webhookHandler } from "../_utils/handlers";

type HookFields = {
  id: string;
};

export const POST = webhookHandler<HookFields>({
  required: {},
  handler: async (_utilContext) => {
    // const { id } = utilContext;

    return { id: "id as string" };
  },
});
export type HookHandlerResponse = ApiResponse<HookFields>;
