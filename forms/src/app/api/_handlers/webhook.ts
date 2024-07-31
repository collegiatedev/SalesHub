// Verify that webhook signature is legit
// extends reqHandler, use with webhook endpoints that require verifcation
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, HandlerConfig, reqHandler } from ".";

export enum SignatureTypes {
  Tally,
  Cal,
}

const verifySignature = (
  payload: any,
  headers: Headers,
  type: SignatureTypes
): boolean => {
  if (!process.env.SIGNING_SECRET)
    throw new Error("SIGNING_SECRET is not defined");

  let receivedSignature, calculatedSignature;
  switch (type) {
    case SignatureTypes.Tally:
      receivedSignature = headers.get("tally-signature") as string;
      calculatedSignature = crypto
        .createHmac("sha256", process.env.SIGNING_SECRET)
        .update(JSON.stringify(payload))
        .digest("base64");
      break;
    case SignatureTypes.Cal:
      receivedSignature = headers.get("x-cal-signature-256") as string;
      calculatedSignature = crypto
        .createHmac("sha256", process.env.SIGNING_SECRET)
        .update(JSON.stringify(payload))
        .digest("hex"); // cal uses hex instead of base64
      break;
    default:
      throw new Error("Invalid signature type");
  }

  return receivedSignature === calculatedSignature;
};

type WebhookHandlerConfig<T> = HandlerConfig<T> & { type: SignatureTypes };
export const webhookHandler = <T>({
  required,
  handler,
  type,
  internal = false,
}: WebhookHandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    const webhookPayload = await req.json();
    if (!verifySignature(webhookPayload, req.headers, type)) {
      return NextResponse.json(
        { message: "Invalid signature", data: null },
        { status: 401 }
      );
    }

    return reqHandler({
      required,
      handler,
      internal,
      requestBody: webhookPayload,
    })(req);
  };
};
