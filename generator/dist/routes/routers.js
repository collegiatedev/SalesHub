"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyParams = exports.asyncHandler = exports.infoRouter = exports.c3Router = exports.c2Router = exports.c1Router = void 0;
const express_1 = require("express");
exports.c1Router = (0, express_1.Router)();
exports.c2Router = (0, express_1.Router)();
exports.c3Router = (0, express_1.Router)();
exports.infoRouter = (0, express_1.Router)();
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            fn(req, res, next); // had await, double check that it's not needed
        }
        catch (error) {
            res.status(500).json({
                message: "An error occurred",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
function isValidString(value) {
    return typeof value === "string";
}
function checkBodyParams(req, requiredParams, optionalParams = []) {
    if (!req.body) {
        return {
            isValid: false,
            error: "Missing body",
        };
    }
    // Use a less restrictive intermediate type
    const params = {};
    const missingParams = [];
    requiredParams.forEach((param) => {
        const key = param;
        if (isValidString(req.body[key])) {
            params[key] = req.body[key];
        }
        else {
            missingParams.push(key);
        }
    });
    optionalParams.forEach((param) => {
        const key = param;
        if (isValidString(req.body[key])) {
            params[key] = req.body[key];
        }
        else {
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
        params: params,
    };
}
exports.checkBodyParams = checkBodyParams;
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
