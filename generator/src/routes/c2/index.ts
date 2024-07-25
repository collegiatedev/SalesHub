import { Router } from "express";
import { conductEssayC2 } from "./essay/conductEssayC2";
import { editEssay } from "./essay/editEssay";
import { additionalFeedback } from "./pb/additionalFeedback";
import { conductPbC2 } from "./pb/conductPbC2";

export const c2Router: Router = Router();

c2Router.post("/essay/conduct", conductEssayC2);
c2Router.post("/essay/edit", editEssay);

c2Router.post("/pb/conduct", conductPbC2);
c2Router.post("/pb/feedback", additionalFeedback);
