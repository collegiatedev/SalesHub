// Google oauth handler with redirect
// extends reqHandler, use for endpoints that require google oauth services
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_TOKEN, oauth2Client, OUTREACH_TOKEN } from "../constants";
import { ApiResponse, handleError, HandlerConfig, reqHandler } from ".";
import { withEndpoint } from "../helpers";
import { SignatureTypes, webhookHandler } from "./webhook";

export type HandlerFunctionWithOAuth<T> = (
  utilContext: Record<string, any>,
  req: NextRequest,
  googleClient?: any
) => Promise<T>;

export enum AccountType {
  Admin = "admin",
  Outreach = "oureach",
}
type OAuthHandlerConfig<T> = Omit<HandlerConfig<T>, "handler"> & {
  handler: HandlerFunctionWithOAuth<T>;
  type?: SignatureTypes; // if using webhooks after oauth
  useRedirect?: boolean; // if true, redirects to oauth flow if no credentials; throws error on false when invalid credentials
  accountType?: AccountType;
};

const loadSavedCredentials = (accountType: AccountType) => {
  try {
    // const content = await fs.readFile(TOKEN_PATH);
    // const credentials = JSON.parse(content.toString());
    let credentials = OUTREACH_TOKEN; // todo, switch to credential store in very distant future
    if (accountType === AccountType.Admin) {
      credentials = ADMIN_TOKEN;
    }

    oauth2Client.setCredentials(credentials as any);
    return oauth2Client;
  } catch (err) {
    return null;
  }
};
export const oauthHandler = <T>({
  handler,
  required,
  type,
  useRedirect = false,
  internal = false,
  accountType = AccountType.Outreach,
}: OAuthHandlerConfig<T>) => {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      const googleClient = !useRedirect && loadSavedCredentials(accountType);

      if (!googleClient) {
        if (!useRedirect) throw new Error("No credentials");

        const origin = encodeURIComponent(req.url);
        const Location = withEndpoint(
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
            internal,
          })(req)
        : reqHandler({
            handler: enhancedHandler,
            required,
            internal,
          })(req);
    } catch (error) {
      return handleError(error);
    }
  };
};
