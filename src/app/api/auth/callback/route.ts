// pages/api/auth/callback/google.ts

import { handleCallback } from "../../_utils/drive/setup";
import { ApiResponse, reqHandler } from "../../_utils/handlers";

type CallbackResponse = {
  success: boolean;
};

export const GET = reqHandler<CallbackResponse>({
  required: { params: ["code"] },
  handler: async ({ code }) => {
    await handleCallback(code);
    return { success: true };
  },
});

export type CallbackHandlerResponse = ApiResponse<CallbackResponse>;
