import { Router } from "express";
import { createFamilyGC } from "./createFamilyGC";
import { conductC1 } from "./conductC1";
import { createDashboard } from "./createDashboard";

export const c1Router: Router = Router();

c1Router.post("/conduct", conductC1);
c1Router.post("/gc", createFamilyGC);
c1Router.post("/dashboard", createDashboard);
