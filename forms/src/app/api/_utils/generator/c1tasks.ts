import axios from "axios";
import { SERVER_URL } from "../../constants";

// I can change this probably to one interface and then use partials?
interface conductC1Info {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  studentEmail: string;
  studentNumber: string;
  parentEmail: string;
  parentNumber: string;
}

interface createDashboardInfo {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  folderLink: string;
  studentEmail: string;
}

interface createGCInfo {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  studentId: string;
  parentName: string;
  studentPhone: string;
  parentPhone: string;
}

export const conductC1Task = async (conductC1Info: conductC1Info) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/c1/conduct`,
      conductC1Info
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

export const createDashboardTask = async (
  createDashboardInfo: createDashboardInfo
) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/c1/dashboard`,
      createDashboardInfo
    );
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

export const createGCTask = async (createGCInfo: createGCInfo) => {
  try {
    const response = await axios.post(`${SERVER_URL}/c1/gc`, createGCInfo);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};
