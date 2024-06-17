import { Router, Request, Response } from "express";
import {
  generateParentInsightResponseInDatabase,
  GenerateParentInsightResponseInDatabaseProps,
} from "../templates/generateParentInsightResponseInDatabase";
import { asyncHandler, checkQueryParams } from "../utils/routers";

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
