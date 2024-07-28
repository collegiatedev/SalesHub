import axios from "axios";
import { SERVER_URL } from "../../constants";
import { withEndpoint } from "../../helpers";

export const createInfo = async (name: string, pageId: string) => {
  try {
    const THIS_URL = withEndpoint("/info/create", "http://localhost:8080");

    const response = await axios.post(THIS_URL, {
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
    const response = await axios.post(
      `${SERVER_URL}/info/contact`,
      contactInfo
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
