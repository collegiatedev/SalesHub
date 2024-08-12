import { generatorEndpoint } from "../../helpers";

export type C1TaskParams = ConductC1 & CreateDashboard & CreateGC;
export const createC1Tasks = async (params: C1TaskParams) =>
  await Promise.all([
    conductC1Task(params),
    createDashboardTask(params),
    createGCTask(params),
  ]);

type ConductC1 = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  studentEmail: string;
  studentNumber: string;
  parentEmail: string;
  parentNumber: string;
};
const conductC1Task = async (body: ConductC1) =>
  await generatorEndpoint({
    route: "/c1/conduct",
    body,
  });

type CreateDashboard = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  folderLink: string;
  studentEmail: string;
};
const createDashboardTask = async (body: CreateDashboard) =>
  await generatorEndpoint({
    route: "/c1/dashboard",
    body,
  });

type CreateGC = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  parentName: string;
  studentPhone: string;
  parentPhone: string;
};
const createGCTask = async (body: CreateGC) =>
  await generatorEndpoint({
    route: "/c1/gc",
    body,
  });
