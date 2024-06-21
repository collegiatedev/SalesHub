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
function isValidString(value: unknown): value is string {
  return typeof value === "string";
}

export function checkQueryParams<T extends Record<string, any>>(
  req: Request,
  requiredParams: (keyof T)[],
  optionalParams: Array<keyof T> = []
): ValidationResult<T> {
  // Use a less restrictive intermediate type
  const params: Record<string, any> = {};
  const missingParams: string[] = [];

  requiredParams.forEach((param) => {
    const key = param as string;
    if (isValidString(req.query[key])) {
      params[key] = req.query[key];
    } else if (!req.query[key]) {
      missingParams.push(key);
    }
  });

  optionalParams.forEach((param) => {
    const key = param as string;
    if (isValidString(req.query[key])) {
      params[key] = req.query[key] as string;
    } else {
      params[key] = ""; // Set empty string for missing optional parameters
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

export function checkBodyParams<T extends Record<string, any>>(
  req: Request,
  requiredParams: (keyof T)[],
  optionalParams: Array<keyof T> = []
): ValidationResult<T> {
  // Use a less restrictive intermediate type
  const params: Record<string, any> = {};
  const missingParams: string[] = [];

  requiredParams.forEach((param) => {
    const key = param as string;

    if (isValidString(req.body[key])) {
      params[key] = req.body[key] as string;
    } else {
      missingParams.push(key);
    }
  });

  optionalParams.forEach((param) => {
    const key = param as string;

    if (isValidString(req.body[key])) {
      params[key] = req.body[key] as string;
    } else {
      params[key] = ""; // Set empty string for missing optional parameters
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
