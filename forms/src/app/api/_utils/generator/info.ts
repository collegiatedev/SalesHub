import axios from "axios";
import { SERVER_URL } from "../../constants";
import { withEndpoint } from "../../helpers";

export const createInfo = async (name: string, pageId: string) => {
  try {
    const endpoint = withEndpoint("/info/create", SERVER_URL);
    const response = await axios.post(endpoint, {
      name,
      pageId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

interface ContactInfo {
  infoId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}
export const infoContact = async (contactInfo: ContactInfo) => {
  try {
    const endpoint = withEndpoint("/info/contact", SERVER_URL);
    const response = await axios.post(endpoint, contactInfo);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
