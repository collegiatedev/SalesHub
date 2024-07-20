// src/utils/drive/setup.ts
import { google } from "googleapis";
import * as path from "path";
import * as fs from "fs/promises";

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/auth/callback/`
);

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    oauth2Client.setCredentials(credentials);
    return oauth2Client;
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: any) {
  const payload = JSON.stringify(client.credentials);
  await fs.writeFile(TOKEN_PATH, payload);
}

export async function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

export async function handleCallback(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  await saveCredentials(oauth2Client);
  return oauth2Client;
}

export async function authorizeDrive() {
  const client = await loadSavedCredentialsIfExist();
  // if (client) return client;
  return client;

  // throw new Error("No credentials found. Please authorize the application.");
}
