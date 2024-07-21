// Verify that webhook signature is legit
// extends reqHandler, use with webhook endpoints that require verifcation
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, HandlerFunction, reqHandler } from ".";

export enum SignatureTypes {
  Tally,
  Cal,
}

type WebhookHandlerParams<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunction<T>;
  type: SignatureTypes;
};

const verifySignature = (
  payload: any,
  headers: Headers,
  type: SignatureTypes
): boolean => {
  if (!process.env.SIGNING_SECRET)
    throw new Error("SIGNING_SECRET is not defined");

  let receivedSignature;
  switch (type) {
    case SignatureTypes.Tally:
      receivedSignature = headers.get("tally-signature") as string;
      break;
    case SignatureTypes.Cal:
      receivedSignature = headers.get("X-Cal-Signature-256") as string;
      break;
    default:
      throw new Error("Invalid signature type");
  }

  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SIGNING_SECRET)
    .update(JSON.stringify(payload))
    .digest("base64");
  return receivedSignature === calculatedSignature;
};

export const webhookHandler = <T>({
  required,
  handler,
  type,
}: WebhookHandlerParams<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    const webhookPayload = await req.json();
    if (!verifySignature(webhookPayload, req.headers, type)) {
      return NextResponse.json(
        { message: "Invalid signature", data: null },
        { status: 401 }
      );
    }

    return reqHandler({ required, handler, requestBody: webhookPayload })(req);
  };
};
