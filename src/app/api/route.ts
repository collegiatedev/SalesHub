import { generateConductC1MeetingDatabase } from "@/src/templates/generateConductC1MeetingDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const test_db = "1b4890ac69d042f2b58e55ca3415915a";

  await generateConductC1MeetingDatabase({
    parentId: test_db,
  });

  return NextResponse.json({
    message: `Success!`,
  });
}
