import { Router, Request, Response } from "express";
import {
  GenerateParentInsightResponseInDatabaseProps,
  generateParentInsightResponseInDatabase,
} from "../templates/table/generateParentInsightResponseInDatabase";
import {
  GeneratePostC1DebriefInDatabaseProps,
  generatePostC1DebriefInDatabase,
} from "../templates/table/generatePostC1DebriefInDatabase";
import {
  GenerateStudentBackgroundResponseInDatabaseProps,
  generateStudentBackgroundResponseInDatabase,
} from "../templates/table/generateStudentBackgroundResponseInDatabase";
import {
  GenEditStudentEssayInDatabaseProps,
  genEditStudentEssayInDatabase,
} from "../templates/tasks/genEditStudentEssayInDatabase";
import {
  asyncHandler,
  checkQueryParams,
  checkBodyParams,
} from "../utils/routers";
import {
  genCreateStudentDashboardInDatabase,
  GenCreateStudentDashboardInDatabaseProps,
} from "../templates/tasks/genCreateStudentDashboardInDatabase";

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
    // using body params because url string ruins the header query
    const validatedParams =
      checkBodyParams<GenerateStudentBackgroundResponseInDatabaseProps>(
        req,
        ["parentId", "name", "uGPA", "wGPA"],
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

createRouter.get(
  "/essay",
  asyncHandler(async (req: Request, res: Response) => {
    // using body params because url string ruins the header query
    const validatedParams = checkBodyParams<GenEditStudentEssayInDatabaseProps>(
      req,
      ["repPageId", "studentName", "studentPageId", "docLink", "fileLink"]
    );

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await genEditStudentEssayInDatabase(validatedParams.params);

    return res.json({
      message: "essay task created",
    });
  })
);

createRouter.get(
  "/dashboard",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams =
      checkBodyParams<GenCreateStudentDashboardInDatabaseProps>(req, [
        "studentName",
        "repPageId",
        "studentPageId",
        "folderLink",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await genCreateStudentDashboardInDatabase(validatedParams.params);

    return res.json({
      message: "task created",
    });
  })
);
