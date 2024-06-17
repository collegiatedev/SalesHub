import { Router, Request, Response } from "express";
import { generateConductC1MeetingInDatabase } from "../templates/generateConductC1MeetingInDatabase";
import { ACCELERATOR_TASKS_DB } from "../utils/constants";

export const registrationRouter: Router = Router();

// example url: http://localhost:3000/registration?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th
// For some reason, need GET for Make.com to behave
registrationRouter.get("/", async (req: Request, res: Response) => {
  try {
    const {
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
    } = req.query;

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
      return res.status(400).json({
        message: `Missing required parameters: ${missingParams.join(", ")}`,
      });
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
      parentId: ACCELERATOR_TASKS_DB as string,
    });

    return res.json({
      message: "Meeting task creation in progress",
    });
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({
      message: "Failed to create meeting",
      error,
    });
  }
});
