const isProduction = process.env.VERCEL_ENV === "production";

// seconds, used for endpoints that are dependent on previous apis calls
// 300s is longer than serverless timeout
export const ENDPOINT_DELAY = 300;

// upstash setup
import { Client as UpstashClient } from "@upstash/qstash";

export const qstashClient = new UpstashClient({
  token: process.env.QSTASH_TOKEN as string,
});

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

// next url
export const NEXT_URL = isProduction
  ? "https://collegiate.dev" // WARNING: DO NOT USE `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_NGROK_URL as string); // no more localhost

// generator server url
export const SERVER_URL = isProduction
  ? "https://king-prawn-app-onivj.ondigitalocean.app"
  : "http://localhost:8080"; // generator local url

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
export const PB_DOC_TEMP = "1SdOCFymZGqomuln6-V1njjZrRPSqRo8gnatrp-SDxuU";
export const ESSAY_DOC_TEMP = "1Xf18-hbfw0FxJTt170pppiHeBpUFL3d72p7EXHtI8hE";

// "temp" token.json for outreach account
// honestly, it lasts basically forever, so we can just use it
// should probably learn how service accounts work though
export const OUTREACH_TOKEN = {
  access_token: process.env.access_token,
  refresh_token: process.env.refresh_token,
  scope: process.env.scope,
  token_type: process.env.token_type,
  expiry_date: process.env.expiry_date,
};
