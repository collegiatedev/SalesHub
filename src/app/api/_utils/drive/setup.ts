import { oauth2Client, TOKEN_PATH } from "../constants";
import * as fs from "fs/promises";

async function loadSavedCredentialsIfExist() {
  // this can be connected with clerk tokens to manage permissions
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    oauth2Client.setCredentials(credentials);
    return oauth2Client;
  } catch (err) {
    return null;
  }
}

export async function authorizeDrive() {
  const client = await loadSavedCredentialsIfExist();
  // if (client) return client;
  return client;

  // throw new Error("No credentials found. Please authorize the application.");
}
