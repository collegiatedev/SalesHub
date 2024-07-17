import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next/types";
import crypto from "crypto";

// 1. validate query params and body
// 2. try-catch error handling (todo: with twilio and sentry notifications)

export type ApiResponse<T> = {
  message: string;
  data: T | null;
};
type HandlerFunction<T> = (utilContext: Record<string, string>) => Promise<T>;

type HandlerConfig<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunction<T>;
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
const validateBody = async (
  req: NextRequest,
  requiredBody: string[] | undefined
): Promise<[Record<string, string>, string[]]> => {
  const utilContext: Record<string, string> = {};
  const missingBody: string[] = [];

  let body;
  try {
    body = await req.json();
  } catch (error) {
    body = {};
  }

  requiredBody?.forEach((field) => {
    if (!(field in body)) {
      missingBody.push(field);
    } else {
      utilContext[field] = body[field];
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

export const reqHandler = <T>({ required, handler }: HandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
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

      const [bodyContext, missingBody] = await validateBody(req, required.body);

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
export const webhookHandler = <T>({ required, handler }: HandlerConfig<T>) => {
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
    return reqHandler({ required, handler })(req);
  };
};
