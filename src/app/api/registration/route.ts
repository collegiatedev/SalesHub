import { generateConductC1MeetingInDatabase } from "@/src/templates/generateConductC1MeetingInDatabase";
import { ACCELERATOR_TASKS_DB } from "@/src/utils/constants";
import { NextRequest, NextResponse } from "next/server";

// Example: localhost:3000/api/registration?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th

// only GET works with Make.com for some reason
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

    const missingParams = [];
    if (!studentId) missingParams.push("studentId");
    if (!studentFullName) missingParams.push("studentFullName");
    if (!studentEmail) missingParams.push("studentEmail");
    if (!studentNumber) missingParams.push("studentNumber");
    if (!parentEmail) missingParams.push("parentEmail");
    if (!parentNumber) missingParams.push("parentNumber");
    if (!repPageId) missingParams.push("repPageId");
    if (!leadPageId) missingParams.push("leadPageId");
    if (!repId) missingParams.push("repId");
    if (!grade) missingParams.push("grade");

    if (missingParams.length > 0) {
      return NextResponse.json(
        {
          message: `Missing required parameters: ${missingParams.join(", ")}`,
        },
        {
          status: 400,
        }
      );
    }

    await generateConductC1MeetingInDatabase({
      studentId: studentId as string,
      studentFullName: studentFullName as string,
      studentEmail: studentEmail as string,
      studentNumber: studentNumber as string,
      parentEmail: parentEmail as string,
      parentNumber: parentNumber as string,
      repPageId: repPageId as string,
      leadPageId: leadPageId as string,
      repId: repId as string,
      grade: grade as string,
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
