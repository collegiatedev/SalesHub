import { Router } from "express";
import { createFamilyGC } from "./createFamilyGC";
import { conductC1 } from "./conductC1";
import { createDashboard } from "./createDashboard";

export const c1Router: Router = Router();

c1Router.get("/conduct", conductC1);
c1Router.get("/gc", createFamilyGC);
c1Router.get("/dashboard", createDashboard);
