import axios from "axios";
import { SERVER_URL } from "../../constants";

interface PostC2Info {
  studentName: string;
  infoId: string;
  repName: string;
  type: string;
  challenges: string;
  value: string;
  alternatives: string;
}
export const c2Debrief = async (postC2Info: PostC2Info) => {
  try {
    const response = await axios.post(`${SERVER_URL}/info/c2`, postC2Info);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
