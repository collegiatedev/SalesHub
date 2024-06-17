import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

type ValidationResult<T extends Record<string, any>> =
  | {
      isValid: true;
      params: T;
    }
  | {
      isValid: false;
      error: string;
    };

export function checkQueryParams<T extends Record<string, any>>(
  req: Request,
  requiredParams: (keyof T)[]
): ValidationResult<T> {
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }

  // Use a less restrictive intermediate type
  const params: Record<string, any> = {};
  const missingParams: string[] = [];

  requiredParams.forEach((param) => {
    const key = param as string;
    if (isString(req.query[key])) {
      params[key] = req.query[key];
    } else if (!req.query[key]) {
      missingParams.push(key);
    }
  });

  if (missingParams.length > 0) {
    return {
      isValid: false,
      error: `Missing required parameters: ${missingParams.join(", ")}`,
    };
  }

  // Cast back to Partial<T> then to T as all required keys are now present
  return {
    isValid: true,
    params: params as Partial<T> as T,
  };
}
