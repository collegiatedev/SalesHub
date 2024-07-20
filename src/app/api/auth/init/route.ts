// pages/api/auth/google/init.ts

import { NextResponse } from "next/server";
import { getAuthUrl } from "../../_utils/drive/setup";

// export const GET = reqHandler<AuthUrlResponse>({
//   required: {},
//   handler: async () => {
//     const authUrl = await getAuthUrl();
//     return { authUrl };
//     NextResponse.redirect(`${process.env.NEXTAUTH_URL}/api/auth/init`);
//   },
// });
export async function GET() {
  const authUrl = await getAuthUrl();
  console.log("authUrl", authUrl);
  return NextResponse.redirect(authUrl);
}
