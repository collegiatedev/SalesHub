import { Router } from "express";
import { create } from "./create";
import { studentBackground } from "./studentBackground";
import { contactInfo } from "./contactInfo";
import { parentInsight } from "./parentInsight";
import { c1Debrief } from "./c1Debrief";
import { c2Debrief } from "./c2Debrief";

export const infoRouter: Router = Router();

// on c1 registration
infoRouter.post("/create", create);
infoRouter.post("/contact", contactInfo);
// on post-c1 forms
infoRouter.post("/background", studentBackground);
infoRouter.post("/insight", parentInsight);
// sales debrief
infoRouter.post("/c1", c1Debrief);
// on post-c2 forms
// sales debrief
infoRouter.post("/c2", c2Debrief);
