"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const generateParentInsightResponseInDatabase_1 = require("../templates/table/generateParentInsightResponseInDatabase");
const generatePostC1DebriefInDatabase_1 = require("../templates/table/generatePostC1DebriefInDatabase");
const generateStudentBackgroundResponseInDatabase_1 = require("../templates/table/generateStudentBackgroundResponseInDatabase");
const genEditStudentEssayInDatabase_1 = require("../templates/tasks/genEditStudentEssayInDatabase");
const routers_1 = require("../utils/routers");
const genCreateStudentDashboardInDatabase_1 = require("../templates/tasks/genCreateStudentDashboardInDatabase");
const genGiveAdditionalFeedbacktoPersonalBrandInDatabase_1 = require("../templates/tasks/genGiveAdditionalFeedbacktoPersonalBrandInDatabase");
exports.createRouter = (0, express_1.Router)();
exports.createRouter.get("/insight", (0, routers_1.asyncHandler)(async (req, res) => {
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
        message: "parent insight response created",
    });
}));
exports.createRouter.get("/debrief", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, [
        "parentId",
        "name",
        "activities",
        "pronunciation",
        "pronouns",
        "intended",
        "plans",
        "profile",
        "additional",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, generatePostC1DebriefInDatabase_1.generatePostC1DebriefInDatabase)(validatedParams.params);
    return res.json({
        message: "post-C1 debrief created",
    });
}));
exports.createRouter.get("/background", (0, routers_1.asyncHandler)(async (req, res) => {
    // using body params because url string ruins the header query
    const validatedParams = (0, routers_1.checkBodyParams)(req, ["parentId", "name", "uGPA", "wGPA"], [
        "additionalAcademic",
        "additionalActivity",
        "professionalLinks",
        "transcripts",
        "resumePortfolios",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, generateStudentBackgroundResponseInDatabase_1.generateStudentBackgroundResponseInDatabase)(validatedParams.params);
    return res.json({
        message: "student background response created",
    });
}));
exports.createRouter.get("/essay", (0, routers_1.asyncHandler)(async (req, res) => {
    // using body params because url string ruins the header query
    const validatedParams = (0, routers_1.checkBodyParams)(req, ["repPageId", "studentName", "studentPageId", "docLink", "fileLink"]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, genEditStudentEssayInDatabase_1.genEditStudentEssayInDatabase)(validatedParams.params);
    return res.json({
        message: "essay task created",
    });
}));
exports.createRouter.get("/dashboard", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkBodyParams)(req, [
        "studentName",
        "repPageId",
        "studentPageId",
        "folderLink",
        "studentEmail",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, genCreateStudentDashboardInDatabase_1.genCreateStudentDashboardInDatabase)(validatedParams.params);
    return res.json({
        message: "task created",
    });
}));
exports.createRouter.get("/pb-feedback", (0, routers_1.asyncHandler)(async (req, res) => {
    // using body params because url string ruins the header query
    const validatedParams = (0, routers_1.checkBodyParams)(req, [
        "repPageId",
        "studentName",
        "studentPageId",
        "pbDocLink",
        "studentDashboardPageId",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, genGiveAdditionalFeedbacktoPersonalBrandInDatabase_1.genGiveAdditionalFeedbacktoPersonalBrandInDatabase)(validatedParams.params);
    return res.json({
        message: "pb feedback task created",
    });
}));
