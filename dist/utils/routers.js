"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryParams = exports.asyncHandler = void 0;
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
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
function checkQueryParams(req, requiredParams) {
    function isString(value) {
        return typeof value === "string";
    }
    // Use a less restrictive intermediate type
    const params = {};
    const missingParams = [];
    requiredParams.forEach((param) => {
        const key = param;
        if (isString(req.query[key])) {
            params[key] = req.query[key];
        }
        else if (!req.query[key]) {
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
        params: params,
    };
}
exports.checkQueryParams = checkQueryParams;
