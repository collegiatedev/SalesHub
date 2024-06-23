"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const routers_1 = require("../utils/routers");
exports.filesRouter = (0, express_1.Router)();
// be able to handle file type uploads for: docs, pdf, docx
exports.filesRouter.get("/essay", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, ["studentId"]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    return res.json({
        message: "essay added",
    });
}));
