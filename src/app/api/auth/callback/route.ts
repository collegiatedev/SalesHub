import { NextResponse } from "next/server";
import { oauth2Client } from "../../constants";
import { reqHandler } from "../../_handlers";

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
  // await saveCredentials(oauth2Client);
  return oauth2Client;
};

// // no need to save credentials,
// // we're treating it as a service account;
// // should probably switch to proper credential store/service account later
// const saveCredentials = async (client: any) => {
//   const payload = JSON.stringify(client.credentials);
//   await fs.writeFile(TOKEN_PATH, payload);
// };
