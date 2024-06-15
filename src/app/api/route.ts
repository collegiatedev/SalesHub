import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  console.log("hello world");
  console.log("bb:", process.env.TEST);
  return NextResponse.json({
    message: `Success!`,
  });
}
