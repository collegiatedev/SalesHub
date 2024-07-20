import { NextResponse } from "next/server";
import { oauth2Client } from "../../constants";
import { reqHandler } from "../../_handlers";

export const GET = reqHandler<any>({
  required: { params: ["origin"] },
  handler: async (utilContext) => {
    const { origin } = utilContext;
    const authUrl = await getAuthUrl(origin as string);
    return NextResponse.redirect(authUrl);
  },
});

const getAuthUrl = async (origin: string) => {
  const SCOPES = ["https://www.googleapis.com/auth/drive"];
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state: encodeURIComponent(origin), // Include the origin URL in the state parameter
  });
};
