// break me up

import axios from "axios";
import { SERVER_URL } from "../../constants";
import { generatorEndpoint, withEndpoint } from "../../helpers";
import { CreatedLeadFields } from "../notion/createLead";

type InfoTable = {
  studentName: string;
  leadId: string;
};
export const createInfoTable = async (body: InfoTable) =>
  generatorEndpoint({
    route: "/info/create",
    body,
  });

// export const createInfoTable = async (body: InfoTable) =>
//   generatorEndpoint({
//     route: "/info/create",
//     body,
//   });

export const contactInfo = async ({
  infoId,
  leadFields,
}: {
  infoId: string;
  leadFields: CreatedLeadFields;
}) => {
  const contact = {
    infoId,
    studentName: leadFields["Student Name"],
    studentEmail: leadFields["Student's Email"],
    studentPhone: leadFields["Student's Phone"],
    parentName: leadFields["Parent Name"],
    parentEmail: leadFields["Parent's Email"],
    parentPhone: leadFields["Parent's Phone"],
  };
  try {
    const endpoint = withEndpoint("/info/contact", SERVER_URL);
    const response = await axios.post(endpoint, contact);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

// from getLead call
type C2Lead = {
  studentName: string;
  infoId: string;
};
export type C2Form = {
  uGPA: string;
  wGPA: string;
};
export type OptionalC2Form = Partial<{
  additionalAcademic: string;
  additionalActivity: string;
  professionalLinks: string;
  transcripts: string; // comma separated; need to change generator to accept array
  resumePortfolios: string;
}>;
type BackgroundInfo = C2Lead & C2Form & OptionalC2Form;
// using params to be less verbose
export const backgroundInfo = async (params: BackgroundInfo) => {
  try {
    const endpoint = withEndpoint("/info/background", SERVER_URL);
    const response = await axios.post(endpoint, params);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
