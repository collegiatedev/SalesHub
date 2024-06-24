"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationRouter = void 0;
const express_1 = require("express");
const createDatabaseInPage_1 = require("../templates/createDatabaseInPage");
const generateContactInfoInDatabase_1 = require("../templates/table/generateContactInfoInDatabase");
const generateConductC1MeetingInDatabase_1 = require("../templates/tasks/generateConductC1MeetingInDatabase");
const constants_1 = require("../utils/constants");
const routers_1 = require("../utils/routers");
// For some reason, need GET for Make.com to behave
exports.registrationRouter = (0, express_1.Router)();
// example url: http://localhost:8080/registration/conduct?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th&time=2021-10-01T00:00:00.000Z
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
        "time",
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
exports.registrationRouter.get("/contact", (0, routers_1.asyncHandler)(async (req, res) => {
    const validatedParams = (0, routers_1.checkQueryParams)(req, [
        "studentEmail",
        "studentPhone",
        "parentEmail",
        "parentPhone",
        "studentName",
        "parentName",
    ]);
    if (!validatedParams.isValid)
        return res.status(400).json({
            message: validatedParams.error,
        });
    await (0, generateContactInfoInDatabase_1.generateContactInfoInDatabase)({
        ...validatedParams.params,
        parentId: constants_1.ACCELERATOR_TASKS_DB,
    });
    return res.json({
        message: "parent insight response created",
    });
}));
