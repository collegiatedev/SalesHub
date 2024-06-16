import { generateConductC1MeetingInDatabase } from "@/src/templates/generateConductC1MeetingInDatabase";
import { ACCELERATOR_TASKS_DB } from "@/src/utils/constants";
import { NextRequest, NextResponse } from "next/server";

// only get works with Make for some reason
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const studentId = searchParams.get("studentId");
    const studentFullName = searchParams.get("studentFullName");
    const studentEmail = searchParams.get("studentEmail");
    const studentNumber = searchParams.get("studentNumber");
    const parentEmail = searchParams.get("parentEmail");
    const parentNumber = searchParams.get("parentNumber");
    const repPageId = searchParams.get("repPageId");
    const leadPageId = searchParams.get("leadPageId");
    const repId = searchParams.get("repId");
    const grade = searchParams.get("grade");

    if (
      !studentId ||
      !studentFullName ||
      !studentEmail ||
      !studentNumber ||
      !parentEmail ||
      !parentNumber ||
      !repPageId ||
      !leadPageId ||
      !repId ||
      !grade
    ) {
      return NextResponse.json(
        {
          message: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    await generateConductC1MeetingInDatabase({
      studentId,
      studentFullName,
      studentEmail,
      studentNumber,
      parentEmail,
      parentNumber,
      repPageId,
      leadPageId,
      repId,
      grade,
      parentId: ACCELERATOR_TASKS_DB,
    });

    return NextResponse.json({
      message: "Meeting task creation in progress",
    });
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json(
      {
        message: "Failed to create meeting",
        error,
      },
      { status: 500 }
    );
  }
}
