import { Router, Request, Response } from "express";
import { asyncHandler, checkQueryParams } from "../utils/routers";
import {
  CreateDatabaseInPageProps,
  createDatabaseInPage,
} from "../templates/createDatabaseInPage";
import {
  genConductC1MeetingInDatabase,
  GenConductC1MeetingInDatabaseProps,
} from "../templates/tasks/genConductC1MeetingInDatabase";
import {
  GenerateContactInfoInDatabaseProps,
  generateContactInfoInDatabase,
} from "../templates/table/generateContactInfoInDatabase";

// For some reason, need GET for Make.com to behave
export const registrationRouter: Router = Router();

// example url: http://localhost:8080/registration/conduct?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th&time=2021-10-01T00:00:00.000Z
registrationRouter.get(
  "/conduct",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GenConductC1MeetingInDatabaseProps>(req, [
        "studentId",
        "studentName",
        "studentEmail",
        "studentNumber",
        "parentEmail",
        "parentNumber",
        "repPageId",
        "studentPageId",
        "repId",
        "grade",
        "time",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await genConductC1MeetingInDatabase(validatedParams.params);

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

registrationRouter.get(
  "/contact",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GenerateContactInfoInDatabaseProps>(req, [
        "parentId",
        "studentEmail",
        "studentPhone",
        "parentEmail",
        "parentPhone",
        "studentName",
        "parentName",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await generateContactInfoInDatabase(validatedParams.params);

    return res.json({
      message: "contact info created",
    });
  })
);
