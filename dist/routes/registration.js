"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationRouter = void 0;
const express_1 = require("express");
const generateConductC1MeetingInDatabase_1 = require("../templates/generateConductC1MeetingInDatabase");
const constants_1 = require("../utils/constants");
exports.registrationRouter = (0, express_1.Router)();
// example url: http://localhost:8080/registration?studentId=kz7zh7t2aw&studentFullName=John%20Doe&studentEmail=johndoe@example.com&studentNumber=+19254873772&parentEmail=parent@example.com&parentNumber=+19254873772&repPageId=cece3b6098b3469ebd2261ebd7319aad&leadPageId=3eca26b8664a478a8e7060967dd79c3f&repId=737019&grade=8th
// For some reason, need GET for Make.com to behave
exports.registrationRouter.get("/", async (req, res) => {
    try {
        const { studentId, studentFullName, studentEmail, studentNumber, parentEmail, parentNumber, repPageId, leadPageId, repId, grade, } = req.query;
        const missingParams = [];
        if (!studentId)
            missingParams.push("studentId");
        if (!studentFullName)
            missingParams.push("studentFullName");
        if (!studentEmail)
            missingParams.push("studentEmail");
        if (!studentNumber)
            missingParams.push("studentNumber");
        if (!parentEmail)
            missingParams.push("parentEmail");
        if (!parentNumber)
            missingParams.push("parentNumber");
        if (!repPageId)
            missingParams.push("repPageId");
        if (!leadPageId)
            missingParams.push("leadPageId");
        if (!repId)
            missingParams.push("repId");
        if (!grade)
            missingParams.push("grade");
        if (missingParams.length > 0) {
            return res.status(400).json({
                message: `Missing required parameters: ${missingParams.join(", ")}`,
            });
        }
        await (0, generateConductC1MeetingInDatabase_1.generateConductC1MeetingInDatabase)({
            studentId: studentId,
            studentFullName: studentFullName,
            studentEmail: studentEmail,
            studentNumber: studentNumber,
            parentEmail: parentEmail,
            parentNumber: parentNumber,
            repPageId: repPageId,
            leadPageId: leadPageId,
            repId: repId,
            grade: grade,
            parentId: constants_1.ACCELERATOR_TASKS_DB,
        });
        return res.json({
            message: "task created",
        });
    }
    catch (error) {
        // Handle any errors that occur
        return res.status(500).json({
            message: "Failed to create meeting",
            error,
        });
    }
});
