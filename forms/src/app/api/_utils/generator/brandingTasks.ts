import { generatorEndpoint } from "../../helpers";

export type BrandingTaskParams = AdditionalFeedback & ConductBranding;
export const brandingTasks = async (params: BrandingTaskParams) => {
  return await Promise.all([
    conductBrandingTask(params),
    additionalInfoTask(params),
  ]);
};

type ConductBranding = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  pbDocLink: string;
  repName: string;
  leadRepId: string;
};
const conductBrandingTask = async (body: ConductBranding) =>
  await generatorEndpoint({
    route: "/c2/branding/conduct",
    body,
  });

type AdditionalFeedback = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  pbDocLink: string;
  dashboardPageId: string;
};
const additionalInfoTask = async (body: AdditionalFeedback) =>
  await generatorEndpoint({
    route: "/c2/branding/feedback",
    body,
  });
