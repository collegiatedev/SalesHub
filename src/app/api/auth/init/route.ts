import { NextRequest, NextResponse } from "next/server";
import { oauth2Client } from "../../_utils/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || "/";
  const authUrl = await getAuthUrl(origin);
  return NextResponse.redirect(authUrl);
}

const getAuthUrl = async (origin: string) => {
  const SCOPES = ["https://www.googleapis.com/auth/drive"];
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state: encodeURIComponent(origin), // Include the origin URL in the state parameter
  });
};
