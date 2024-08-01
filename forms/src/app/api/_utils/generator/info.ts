// break me up

import axios from "axios";
import { SERVER_URL } from "../../constants";
import { withEndpoint } from "../../helpers";
import { CreatedLeadFields } from "../notion/createLead";

export const createInfoTable = async ({
  studentName,
  leadId,
}: {
  studentName: string;
  leadId: string;
}) => {
  try {
    const endpoint = withEndpoint("/info/create", SERVER_URL);
    const response = await axios.post(endpoint, {
      name: studentName,
      pageId: leadId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

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
  transcripts: string;
  resumePortfolios: string;
}>;
interface BackgroundInfo {
  params: C2Lead & C2Form & OptionalC2Form;
} // using params pattern to be less verbose
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
