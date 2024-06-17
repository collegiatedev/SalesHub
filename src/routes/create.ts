import { Router, Request, Response } from "express";
import {
  generateParentInsightResponseInDatabase,
  GenerateParentInsightResponseInDatabaseProps,
} from "../templates/generateParentInsightResponseInDatabase";
import { asyncHandler, checkQueryParams } from "../utils/routers";
import {
  createDatabaseInPage,
  CreateDatabaseInPageProps,
} from "../templates/createDatabaseInPage";

export const createRouter: Router = Router();

createRouter.get(
  "/",
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

createRouter.get(
  "/c",
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
      message: "table created, page updated",
    });
  })
);
