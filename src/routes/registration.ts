import { Router, Request, Response } from "express";
import {
  generateConductC1MeetingInDatabase,
  GenerateConductC1MeetingInDatabaseProps,
} from "../templates/generateConductC1MeetingInDatabase";
import { asyncHandler, checkQueryParams } from "../utils/routers";
import { ACCELERATOR_TASKS_DB } from "../utils/constants";
import {
  CreateDatabaseInPageProps,
  createDatabaseInPage,
} from "../templates/createDatabaseInPage";

// For some reason, need GET for Make.com to behave
export const registrationRouter: Router = Router();

// example url: http://localhost:8080/registration/conduct?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th
registrationRouter.get(
  "/conduct",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GenerateConductC1MeetingInDatabaseProps>(req, [
        "studentId",
        "studentFullName",
        "studentEmail",
        "studentNumber",
        "parentEmail",
        "parentNumber",
        "repPageId",
        "leadPageId",
        "repId",
        "grade",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await generateConductC1MeetingInDatabase({
      ...validatedParams.params,
      parentId: ACCELERATOR_TASKS_DB,
    });

    return res.json({
      message: "task created",
    });
  })
);

registrationRouter.get(
  "/crm",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = checkQueryParams<CreateDatabaseInPageProps>(req, [
      "pageId",
      "name",
    ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await createDatabaseInPage(validatedParams.params);

    return res.json({
      message: "table created, page updated",
    });
  })
);
