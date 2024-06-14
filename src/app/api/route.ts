import { generateConductC1MeetingInDatabase } from "@/src/templates/generateConductC1MeetingInDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const test_db = "1b4890ac69d042f2b58e55ca3415915a";

  await generateConductC1MeetingInDatabase({
    parentId: test_db,
  });

  return NextResponse.json({
    message: `Success!`,
  });
}
