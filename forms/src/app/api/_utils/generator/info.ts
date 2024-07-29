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
