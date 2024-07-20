// Verify that webhook signature is legit
// extends reqHandler, use for endpoints with tally webhook
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, HandlerFunction, reqHandler } from ".";

const verifyTallySignature = (
  payload: any,
  receivedSignature: string
): boolean => {
  if (!process.env.SIGNING_SECRET) {
    throw new Error("SIGNING_SECRET is not defined");
  }
  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SIGNING_SECRET)
    .update(JSON.stringify(payload))
    .digest("base64");
  return receivedSignature === calculatedSignature;
};

export const webhookHandler = <T>(
  required: { params?: string[]; body?: string[] },
  handler: HandlerFunction<T>
) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    const webhookPayload = await req.json();
    const receivedSignature = req.headers.get("tally-signature") as string;

    if (!verifyTallySignature(webhookPayload, receivedSignature)) {
      return NextResponse.json(
        { message: "Invalid signature", data: null },
        { status: 401 }
      );
    }

    return reqHandler({ required, handler, requestBody: webhookPayload })(req);
  };
};
