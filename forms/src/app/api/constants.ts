import { isProduction, NEXT_URL } from "../constants";

import Stripe from "stripe";

export enum StripeType {
  Production,
  Test,
}
const stripeProd = new Stripe(process.env.PROD_STRIPE_SECRET_KEY as string); // for products that are live in production
const stripeTest = new Stripe(process.env.TEST_STRIPE_SECRET_KEY as string); // for products that are in test mode
export const stripeClient = (type: StripeType) => {
  switch (type) {
    case StripeType.Production:
      return stripeProd;
    case StripeType.Test:
      return stripeTest;
  }
};

// seconds, used for endpoints that are dependent on previous apis calls
// 300s is longer than serverless timeout
export const ENDPOINT_DELAY = 300;

// upstash setup
import { Client as UpstashClient } from "@upstash/qstash";
import { Redis } from "@upstash/redis";

export const qstashClient = new UpstashClient({
  token: process.env.QSTASH_TOKEN as string,
});
export const redis = Redis.fromEnv();

// notion setup
import { Client as NotionClient } from "@notionhq/client";

export const notionClient = new NotionClient({
  auth: process.env.NOTION_API_KEY,
});

export const LEAD_DATABASE_ID = "27386326248f4dae9374811627be3036";
export const REP_DATABASE_ID = "8a18df75a9234fd8878ce0a3643e0ca7";

export const INITIAL_TALLY_STATUS = isProduction
  ? Statuses.Incomplete
  : Statuses.Test;
export const INITIAL_CAL_STATUS = isProduction
  ? Statuses.Ongoing
  : Statuses.Test;

// google auth setup
import { google } from "googleapis";
import { Statuses } from "./_utils/notion/types";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${NEXT_URL}/api/auth/callback/`
);

// drive, doc templates
export const OUTREACH_ACCELERATOR_FOLDER = "1BbpKFfIXVyacLC4q7s0zsZ70DSJd0mbH";
export const BRANDING_DOC_TEMP = "1SdOCFymZGqomuln6-V1njjZrRPSqRo8gnatrp-SDxuU";
export const ESSAY_DOC_TEMP = "1Xf18-hbfw0FxJTt170pppiHeBpUFL3d72p7EXHtI8hE";

// "temp" token.json for outreach account
// honestly, it lasts basically forever, so we can just use it
// should probably learn how service accounts work though
export const OUTREACH_TOKEN = {
  access_token: process.env.outreach_access_token,
  refresh_token: process.env.outreach_refresh_token,
  scope: process.env.outreach_scope,
  token_type: process.env.outreach_token_type,
  expiry_date: process.env.outreach_expiry_date,
};

export const ADMIN_TOKEN = {
  access_token: process.env.admin_access_token,
  refresh_token: process.env.admin_refresh_token,
  scope: process.env.admin_scope,
  token_type: process.env.admin_token_type,
  expiry_date: process.env.admin_expiry_date,
};
