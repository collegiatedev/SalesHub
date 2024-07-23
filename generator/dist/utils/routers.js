"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyParams = exports.checkQueryParams = exports.asyncHandler = void 0;
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
function checkQueryParams(req, requiredParams, optionalParams = []) {
    // Use a less restrictive intermediate type
    const params = {};
    const missingParams = [];
    requiredParams.forEach((param) => {
        const key = param;
        if (isValidString(req.query[key])) {
            params[key] = req.query[key];
        }
        else if (!req.query[key]) {
            missingParams.push(key);
        }
    });
    optionalParams.forEach((param) => {
        const key = param;
        if (isValidString(req.query[key])) {
            params[key] = req.query[key];
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
exports.checkQueryParams = checkQueryParams;
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
