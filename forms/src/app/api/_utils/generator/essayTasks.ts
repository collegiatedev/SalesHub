import axios from "axios";
import { SERVER_URL } from "../../constants";

export type EssayTaskParams = ConductEssay & EditEssay;
export const essayTasks = async (params: EssayTaskParams) => {
  return await Promise.all([conductEssayTask(params), editEssayTask(params)]);
};

type ConductEssay = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  docLink: string;
  repName: string;
  leadRepId: string;
};
const conductEssayTask = async (params: ConductEssay) => {
  try {
    const response = await axios.post(`${SERVER_URL}/c2/essay/conduct`, params);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

type EditEssay = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  docLink: string;
  fileLink: string;
};
const editEssayTask = async (params: EditEssay) => {
  try {
    const response = await axios.post(`${SERVER_URL}/c2/essay/edit`, params);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
