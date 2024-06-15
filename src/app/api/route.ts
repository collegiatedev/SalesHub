import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  return NextResponse.json({
    message: `Success Here! ${process.env.NOTION_API_KEY_READONLY}`,
  });
}
