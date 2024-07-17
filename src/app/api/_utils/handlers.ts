import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 1. validate query params and body
// 2. try-catch error handling (todo: with twilio and sentry notifications)

export type ApiResponse<T> = {
  message: string;
  data: T | null;
};
type HandlerFunction<T> = (utilContext: Record<string, any>) => Promise<T>;

type HandlerConfig<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunction<T>;
  requestBody?: any;
};

const validateParams = (
  searchParams: URLSearchParams,
  requiredParams: string[] | undefined
): [Record<string, string>, string[]] => {
  const utilContext: Record<string, string> = {};
  const missingParams: string[] = [];

  requiredParams?.forEach((param) => {
    const value = searchParams.get(param);
    if (value === null) {
      missingParams.push(param);
    } else {
      utilContext[param] = value;
    }
  });

  return [utilContext, missingParams];
};
const validateBody = (
  body: any,
  requiredBody: string[] | undefined
): [Record<string, any>, string[]] => {
  const utilContext: Record<string, any> = {};
  const missingBody: string[] = [];

  requiredBody?.forEach((field) => {
    const fieldParts = field.split(".");
    let current = body;
    for (let i = 0; i < fieldParts.length; i++) {
      if (!(fieldParts[i]! in current)) {
        missingBody.push(field);
        break;
      } else if (i === fieldParts.length - 1) {
        utilContext[field] = current[fieldParts[i]!];
      } else {
        current = current[fieldParts[i]!];
      }
    }
  });

  return [utilContext, missingBody];
};

const handleError = (error: unknown): NextResponse<ApiResponse<any>> => {
  console.error(error);

  const errorResponse = {
    message: error instanceof Error ? error.message : "Unknown error occurred",
    data: null,
  };

  return NextResponse.json(errorResponse, { status: 500 });
};

export const reqHandler = <T>({
  required,
  handler,
  requestBody,
}: HandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      const reqBody = requestBody || (await req.json());

      const { searchParams } = new URL(req.url);
      const [paramsContext, missingParams] = validateParams(
        searchParams,
        required.params
      );

      if (missingParams.length > 0) {
        return NextResponse.json(
          {
            message: `Missing required query parameters: ${missingParams.join(
              ", "
            )}`,
            data: null,
          },
          { status: 400 }
        );
      }

      const [bodyContext, missingBody] = validateBody(reqBody, required.body);

      if (missingBody.length > 0) {
        return NextResponse.json(
          {
            message: `Missing required body fields: ${missingBody.join(", ")}`,
            data: null,
          },
          { status: 400 }
        );
      }

      const utilContext = { ...paramsContext, ...bodyContext };
      const data = await handler(utilContext);

      return NextResponse.json({
        message: "Success",
        data,
      });
    } catch (error) {
      return handleError(error);
    }
  };
};

// 3. Verify that webhook signature is legit

const verifyTallySignature = (
  payload: any,
  receivedSignature: string
): boolean => {
  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SIGNING_SECRET!)
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

    // Proceed with reqHandler as usual
    return reqHandler({ required, handler, requestBody: webhookPayload })(req);
  };
};
