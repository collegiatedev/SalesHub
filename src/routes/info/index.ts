import { Router } from "express";
import { create } from "./create";
import { studentBackground } from "./studentBackground";
import { contactInfo } from "./contactInfo";
import { parentInsight } from "./parentInsight";
import { c1Debrief } from "./c1Debrief";
import { c2Debrief } from "./c2Debrief";

export const infoRouter: Router = Router();

infoRouter.get("/create", create);
infoRouter.get("/background", studentBackground);
infoRouter.get("/contact", contactInfo);
infoRouter.get("/insight", parentInsight);
infoRouter.get("/c1", c1Debrief);
infoRouter.get("/c2", c2Debrief);
