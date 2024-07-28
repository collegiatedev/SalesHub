// Google oauth handler with redirect
// extends reqHandler, use for endpoints that require google oauth services
import { NextRequest, NextResponse } from "next/server";
import { oauth2Client, OUTREACH_TOKEN } from "../constants";
import { ApiResponse, handleError, reqHandler } from ".";
import { useEndpoint } from "../helpers";
import { SignatureTypes, webhookHandler } from "./webhook";

type HandlerFunctionWithOAuth<T> = (
  utilContext: Record<string, any>,
  req: NextRequest,
  googleClient?: any
) => Promise<T>;

type OAuthHandlerConfig<T> = {
  required: { params?: string[]; body?: string[] };
  handler: HandlerFunctionWithOAuth<T>;

  type?: SignatureTypes; // if using webhooks
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
  type,
  useRedirect = false,
}: OAuthHandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      const googleClient = await loadSavedCredentialsIfExist();

      if (!googleClient) {
        if (!useRedirect) throw new Error("No credentials");

        const origin = encodeURIComponent(req.url);
        const Location = useEndpoint(
          `/api/auth/init?origin=${origin}`,
          req.url
        );
        return NextResponse.json(
          { message: "Redirecting to OAuth", data: null },
          { status: 307, headers: { Location } }
        );
      }

      const enhancedHandler = async (utilContext: Record<string, any>) =>
        handler(utilContext, req, googleClient);

      // if type is defined, we're using webhooks
      return type
        ? webhookHandler({
            handler: enhancedHandler,
            required,
            type,
          })(req)
        : reqHandler({
            handler: enhancedHandler,
            required,
          })(req);
    } catch (error) {
      return handleError(error);
    }
  };
};
