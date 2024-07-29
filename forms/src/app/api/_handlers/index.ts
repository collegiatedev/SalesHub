// 1. validate query params and body
// 2. try-catch error handling
import { NextRequest, NextResponse } from "next/server";

export type ApiResponse<T> = {
  message: string;
  data: T | null;
};
export type HandlerFunction<T> = (
  utilContext: Record<string, any>,
  req: NextRequest
) => Promise<T>;
export type HandlerConfig<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunction<T>;
  requestBody?: any; // since reqs can only be parsed once, we pass request body if reqHandler is being called by another handler
  internal?: boolean; // when true, requires INTERNAL_SECRET to be passed to body as a secret; true when function is only being called by our queue but not clients
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

export const handleError = (error: unknown): NextResponse<ApiResponse<any>> => {
  const errorResponse = {
    message: error instanceof Error ? error.message : "Unknown error occurred",
    data: null,
  };
  console.error("handleError", errorResponse);

  return NextResponse.json(errorResponse, { status: 500 });
};

export const reqHandler = <T>({
  required,
  handler,
  requestBody,
  internal = false,
}: HandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      let reqBody = requestBody;
      if (!reqBody) {
        const bodyText = await req.text();
        if (bodyText) reqBody = JSON.parse(bodyText);
        else reqBody = {};
      }
      if (internal && reqBody.secret !== process.env.INTERNAL_SECRET)
        NextResponse.json(
          { message: "Missing or invalid secret", data: null },
          { status: 401 }
        );

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
      const data = await handler(utilContext, req);
      // allows for custom responses (i.e. redirect)
      if (data instanceof NextResponse) return data;

      return NextResponse.json({
        message: "Success",
        data,
      });
    } catch (error) {
      return handleError(error);
    }
  };
};
