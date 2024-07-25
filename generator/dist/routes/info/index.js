"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoRouter = void 0;
const express_1 = require("express");
const create_1 = require("./create");
const studentBackground_1 = require("./studentBackground");
const contactInfo_1 = require("./contactInfo");
const parentInsight_1 = require("./parentInsight");
const c1Debrief_1 = require("./c1Debrief");
const c2Debrief_1 = require("./c2Debrief");
exports.infoRouter = (0, express_1.Router)();
// on c1 registration
exports.infoRouter.post("/create", create_1.create);
exports.infoRouter.post("/contact", contactInfo_1.contactInfo);
// on post-c1 forms
exports.infoRouter.post("/background", studentBackground_1.studentBackground);
exports.infoRouter.post("/insight", parentInsight_1.parentInsight);
// sales debrief
exports.infoRouter.post("/c1", c1Debrief_1.c1Debrief);
// on post-c2 forms
// sales debrief
exports.infoRouter.post("/c2", c2Debrief_1.c2Debrief);
