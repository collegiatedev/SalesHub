import { Client } from "@notionhq/client";

// notion setup
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});
export const LEAD_DATABASE_ID = "27386326248f4dae9374811627be3036";

// express server setup
export const SERVER_URL = "https://king-prawn-app-onivj.ondigitalocean.app";
// next url
const isProduction = process.env.VERCEL_ENV === "production";
const deployedURL = `https://${process.env.VERCEL_URL}`;
const NEXT_URL = isProduction ? deployedURL : "http://localhost:3000"; // might be 3001 sometimes

// google auth setup
import { google } from "googleapis";
import * as path from "path";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${NEXT_URL}/api/auth/callback/`
);
export const TOKEN_PATH = path.join(process.cwd(), "token.json");

// drive setup
export const OUTREACH_ACCELERATOR_FOLDER = "1BbpKFfIXVyacLC4q7s0zsZ70DSJd0mbH";
