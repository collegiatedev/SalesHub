import axios from "axios";
import { SERVER_URL } from "../../constants";

interface PostC1Info {
  studentName: string;
  infoId: string;
  activities: string;
  pronunciation: string;
  pronouns: string;
  intended: string;
  plans: string;
  profile: string;
  additional: string;
}
export const c1Debrief = async (postC1Info: PostC1Info) => {
  try {
    const response = await axios.post(`${SERVER_URL}/info/c1`, postC1Info);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
