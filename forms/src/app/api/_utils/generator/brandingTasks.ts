import axios from "axios";
import { SERVER_URL } from "../../constants";

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
const conductBrandingTask = async (params: ConductBranding) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/c2/branding/conduct`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

type AdditionalFeedback = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  pbDocLink: string;
  dashboardPageId: string;
};
const additionalInfoTask = async (params: AdditionalFeedback) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/c2/branding/feedback`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
