"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const generateParentInsightResponseInDatabase_1 = require("../templates/generateParentInsightResponseInDatabase");
const routers_1 = require("../utils/routers");
const createDatabaseInPage_1 = require("../templates/createDatabaseInPage");
exports.createRouter = (0, express_1.Router)();
exports.createRouter.get("/", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, [
        "pageId",
        "name",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, createDatabaseInPage_1.createDatabaseInPage)(validatedParams.params);
    return res.json({
        message: "table created, page updated",
    });
}));
exports.createRouter.get("/c", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, [
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
    await (0, generateParentInsightResponseInDatabase_1.generateParentInsightResponseInDatabase)(validatedParams.params);
    return res.json({
        message: "table created, page updated",
    });
}));
