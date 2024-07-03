import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

export const createRouter: Router = Router();
export const registrationRouter: Router = Router();

export const c1Router: Router = Router();
export const c2Router: Router = Router();
export const c3Router: Router = Router();
export const infoRouter: Router = Router();

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next); // had await, double check that it's not needed
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

export function checkBodyParams<T extends Record<string, any>>(
  req: Request,
  requiredParams: (keyof T)[],
  optionalParams: Array<keyof T> = []
): ValidationResult<T> {
  if (!req.body) {
    return {
      isValid: false,
      error: "Missing body",
    };
  }

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

// depreciated
// function checkQueryParams<T extends Record<string, any>>(
//   req: Request,
//   requiredParams: (keyof T)[],
//   optionalParams: Array<keyof T> = []
// ): ValidationResult<T> {
//   // Use a less restrictive intermediate type
//   const params: Record<string, any> = {};
//   const missingParams: string[] = [];

//   requiredParams.forEach((param) => {
//     const key = param as string;
//     if (isValidString(req.query[key])) {
//       params[key] = req.query[key];
//     } else if (!req.query[key]) {
//       missingParams.push(key);
//     }
//   });

//   optionalParams.forEach((param) => {
//     const key = param as string;
//     if (isValidString(req.query[key])) {
//       params[key] = req.query[key] as string;
//     } else {
//       params[key] = ""; // Set empty string for missing optional parameters
//     }
//   });

//   if (missingParams.length > 0) {
//     return {
//       isValid: false,
//       error: `Missing required parameters: ${missingParams.join(", ")}`,
//     };
//   }

//   // Cast back to Partial<T> then to T as all required keys are now present
//   return {
//     isValid: true,
//     params: params as Partial<T> as T,
//   };
// }
