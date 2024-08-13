import { AccountType, oauthHandler } from "./oauth";
import { reqHandler } from ".";

// todo, change from <T> to <T, U>; long type migration

// output handler

// extend as needed
export enum HandlerTypes {
  Req = "req",
  OAuth_Outreach = "oauth_outreach",
  OAuth_Admin = "oauth_admin",
  // Webhook = "webhook" not added, since input are already handled by webhooks
}
interface OutputHandlerBase {
  type: HandlerTypes;
}
interface OAuthHandler<T> extends OutputHandlerBase {
  type: HandlerTypes.OAuth_Outreach | HandlerTypes.OAuth_Admin;
  handler: (input: T, googleClient: any) => Promise<any>;
}
interface ReqHandler<T> extends OutputHandlerBase {
  type: HandlerTypes.Req;
  handler: (input: T) => Promise<any>;
}
type OutputHandler<T> = OAuthHandler<T> | ReqHandler<T>;

// specifies the config for an output handler
export const outputHandler = <T>({ handler, type }: OutputHandler<T>) => {
  switch (type) {
    case HandlerTypes.Req:
      return reqHandler<T>({
        required: { body: ["input"] },
        internal: true, // should only be called by associated /i endpoint
        handler: async (utilContext, _req) => {
          const { input } = utilContext;
          return handler(input);
        },
      });
    case HandlerTypes.OAuth_Outreach:
      return oauthHandler<T>({
        required: { body: ["input"] },
        internal: true, // should only be called by associated /i endpoint
        useRedirect: false, // since internal already, no point in redirecting
        handler: async (utilContext, _req, googleClient) => {
          const { input } = utilContext;
          return handler(input, googleClient);
        },
        accountType: AccountType.Outreach,
      });
    // same, but for admin; just kinda lazy to clean this up
    case HandlerTypes.OAuth_Admin:
      return oauthHandler<T>({
        required: { body: ["input"] },
        internal: true, // should only be called by associated /i endpoint
        useRedirect: false, // since internal already, no point in redirecting
        handler: async (utilContext, _req, googleClient) => {
          const { input } = utilContext;
          return handler(input, googleClient);
        },
        accountType: AccountType.Admin,
      });
    default:
      throw new Error("Invalid handler type");
  }
};
