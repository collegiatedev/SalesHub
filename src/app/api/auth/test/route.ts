import { NextRequest, NextResponse } from "next/server";
import { listFiles } from "../../_utils/drive/createFolder";

export async function GET(request: NextRequest) {
  const works = await listFiles();
  const redirectUrl = new URL("/api/auth/init", request.url);
  if (!works) return NextResponse.redirect(redirectUrl);

  return NextResponse.redirect(redirectUrl);
}
