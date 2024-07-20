import { NextResponse } from "next/server";
import { oauth2Client, TOKEN_PATH } from "../../_utils/constants";
import { ApiResponse, reqHandler } from "../../_utils/handlers";
import * as fs from "fs/promises";

export const GET = reqHandler<any>({
  required: { params: ["code", "state"] },
  handler: async ({ code, state }) => {
    await handleCallback(code);
    const redirectUrl = decodeURIComponent(state);
    return NextResponse.redirect(redirectUrl);
  },
});

const handleCallback = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  await saveCredentials(oauth2Client);
  return oauth2Client;
};

const saveCredentials = async (client: any) => {
  const payload = JSON.stringify(client.credentials);
  await fs.writeFile(TOKEN_PATH, payload);
};
