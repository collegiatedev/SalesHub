import { Router } from "express";
import { conductEssayC2 } from "./essay/conductEssayC2";
import { editEssay } from "./essay/editEssay";
import { additionalFeedback } from "./branding/additionalFeedback";
import { conductBrandingC2 } from "./branding/conductBrandingC2";

export const c2Router: Router = Router();

c2Router.post("/essay/conduct", conductEssayC2);
c2Router.post("/essay/edit", editEssay);

c2Router.post("/branding/feedback", additionalFeedback);
c2Router.post("/branding/conduct", conductBrandingC2);
