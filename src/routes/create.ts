import { Router, Request, Response } from "express";
import {
  generateParentInsightResponseInDatabase,
  GenerateParentInsightResponseInDatabaseProps,
} from "../templates/generateParentInsightResponseInDatabase";
import { asyncHandler, checkQueryParams } from "../utils/routers";
import {
  generatePostC1DebriefInDatabase,
  GeneratePostC1DebriefInDatabaseProps,
} from "../templates/generatePostC1DebriefInDatabase";
import {
  generateStudentBackgroundResponseInDatabase,
  GenerateStudentBackgroundResponseInDatabaseProps,
} from "../templates/generateStudentBackgroundResponseInDatabase";

export const createRouter: Router = Router();

createRouter.get(
  "/insight",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GenerateParentInsightResponseInDatabaseProps>(req, [
        "parentId",
        "name",
        "whyNow",
        "programFit",
        "programSupport",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await generateParentInsightResponseInDatabase(validatedParams.params);

    return res.json({
      message: "parent insight response created",
    });
  })
);

createRouter.get(
  "/debrief",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GeneratePostC1DebriefInDatabaseProps>(req, [
        "parentId",
        "name",
        "activities",
        "pronunciation",
        "pronouns",
        "intended",
        "plans",
        "profile",
        "additional",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await generatePostC1DebriefInDatabase(validatedParams.params);

    return res.json({
      message: "post-C1 debrief created",
    });
  })
);

createRouter.get(
  "/background",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkQueryParams<GenerateStudentBackgroundResponseInDatabaseProps>(
        req,
        ["parentId", "uGPA", "wGPA"],
        [
          "additionalAcademic",
          "additionalActivity",
          "professionalLinks",
          "transcripts",
          "resumePortfolios",
        ]
      );

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await generateStudentBackgroundResponseInDatabase(validatedParams.params);

    return res.json({
      message: "student background response created",
    });
  })
);
