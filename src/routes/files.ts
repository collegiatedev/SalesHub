import { Router, Request, Response } from "express";
import { asyncHandler, checkQueryParams } from "../utils/routers";

export const filesRouter: Router = Router();

// be able to handle file type uploads for: docs, pdf, docx
filesRouter.get(
  "/essay",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = checkQueryParams<any>(req, ["studentId"]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    return res.json({
      message: "essay added",
    });
  })
);
