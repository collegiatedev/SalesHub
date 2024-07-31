// input, output handlers
// break me up

import { NextRequest } from "next/server";
import { qstashClient, NEXT_URL } from "../constants";
import { withEndpoint } from "../helpers";
import { SignatureTypes, webhookHandler } from "./webhook";
import { oauthHandler } from "./oauth";
import { reqHandler } from ".";

// input handler
interface InputHandler {
  type: SignatureTypes;
  route: string;
  delay?: number;
}
export const inputHandler = ({ type, route, delay = 0 }: InputHandler) => {
  let bodyName: string;
  switch (type) {
    case SignatureTypes.Tally:
      bodyName = "data.fields";
      break;
    case SignatureTypes.Cal:
      bodyName = "payload";
      break;
    default:
      throw new Error("invalid signature type");
  }
  return webhookHandler<any>({
    type,
    required: { body: [bodyName] },
    handler: async (utilContext: any, _req: NextRequest) => {
      const input = utilContext[bodyName];
      return await qstashClient.publishJSON({
        url: withEndpoint(route, NEXT_URL),
        body: { input, secret: process.env.INTERNAL_SECRET },
        delay, // in ms
      });
    },
  });
};

// output handler

// extend as needed
export enum HandlerTypes {
  Req = "req",
  OAuth = "oauth",
  // Webhook = "webhook" not added, since input are already handled by webhooks
}
interface OutputHandlerBase {
  type: HandlerTypes;
}
interface OAuthHandler<T> extends OutputHandlerBase {
  type: HandlerTypes.OAuth;
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
    case HandlerTypes.OAuth:
      return oauthHandler<T>({
        required: { body: ["input"] },
        internal: true, // should only be called by associated /i endpoint
        useRedirect: false, // since internal already, no point in redirecting
        handler: async (utilContext, _req, googleClient) => {
          const { input } = utilContext;
          return handler(input, googleClient);
        },
      });
    case HandlerTypes.Req:
      return reqHandler<T>({
        required: { body: ["input"] },
        internal: true, // should only be called by associated /i endpoint
        handler: async (utilContext, _req) => {
          const { input } = utilContext;
          return handler(input);
        },
      });
    default:
      throw new Error("Invalid handler type");
  }
};
