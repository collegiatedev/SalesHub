// 1. validate query params and body
// 2. try-catch error handling (todo: with twilio/sentry notifications)
import { NextRequest, NextResponse } from "next/server";

export type ApiResponse<T> = {
  message: string;
  data: T | null;
};
export type HandlerFunction<T> = (
  utilContext: Record<string, any>,
  req: NextRequest
) => Promise<T>;
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
}: HandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      let reqBody = requestBody;
      if (!reqBody) {
        const bodyText = await req.text();
        if (bodyText) reqBody = JSON.parse(bodyText);
        else reqBody = {};
      }

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

// c1. google oauth handler with redirect
import { oauth2Client, OUTREACH_TOKEN } from "../constants";

type HandlerFunctionWithOAuth<T> = (
  utilContext: Record<string, any>,
  req: NextRequest,
  googleClient?: any
) => Promise<T>;

type OAuthHandlerConfig<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunctionWithOAuth<T>;
  requestBody?: any;
  // default true, redirects to oauth flow if no credentials
  // false, we throw an error if no credentials
  useRedirect?: boolean;
};

const loadSavedCredentialsIfExist = async () => {
  try {
    // const content = await fs.readFile(TOKEN_PATH);
    // const credentials = JSON.parse(content.toString());
    const credentials = OUTREACH_TOKEN; // todoswitch to credential store in very distant future
    oauth2Client.setCredentials(credentials as any);
    return oauth2Client;
  } catch (err) {
    return null;
  }
};

export const oauthHandler = <T>({
  required,
  handler,
  requestBody,
  useRedirect = true,
}: OAuthHandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      const googleClient = await loadSavedCredentialsIfExist();

      if (!googleClient) {
        if (!useRedirect) throw new Error("No credentials");

        const origin = encodeURIComponent(req.url);
        const redirectUrl = new URL(`/api/auth/init?origin=${origin}`, req.url);
        return NextResponse.json(
          { message: "Redirecting to OAuth", data: null },
          { status: 307, headers: { Location: redirectUrl.toString() } }
        );
      }

      const enhancedHandler = async (utilContext: Record<string, any>) =>
        handler(utilContext, req, googleClient);

      return reqHandler({
        handler: enhancedHandler,
        required,
        requestBody,
      })(req);
    } catch (error) {
      return handleError(error);
    }
  };
};
