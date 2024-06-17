"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationRouter = void 0;
const express_1 = require("express");
const generateConductC1MeetingInDatabase_1 = require("../templates/generateConductC1MeetingInDatabase");
const routers_1 = require("../utils/routers");
const constants_1 = require("../utils/constants");
const createDatabaseInPage_1 = require("../templates/createDatabaseInPage");
// For some reason, need GET for Make.com to behave
exports.registrationRouter = (0, express_1.Router)();
// example url: http://localhost:8080/registration/conduct?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th
exports.registrationRouter.get("/conduct", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, [
        "studentId",
        "studentFullName",
        "studentEmail",
        "studentNumber",
        "parentEmail",
        "parentNumber",
        "repPageId",
        "leadPageId",
        "repId",
        "grade",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, generateConductC1MeetingInDatabase_1.generateConductC1MeetingInDatabase)({
        ...validatedParams.params,
        parentId: constants_1.ACCELERATOR_TASKS_DB,
    });
    return res.json({
        message: "task created",
    });
}));
exports.registrationRouter.get("/crm", (0, routers_1.asyncHandler)(async (req, res) => {
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
