import axios from "axios";
import { SERVER_URL } from "../../constants";
import { LeadFields } from "../notion/getLead";
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
const conductC1Task = async (conductC1Info: conductC1Info) => {
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

interface createDashboardInfo {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  folderLink: string;
  studentEmail: string;
}
const createDashboardTask = async (
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
const createGCTask = async (createGCInfo: createGCInfo) => {
  try {
    const response = await axios.post(`${SERVER_URL}/c1/gc`, createGCInfo);
    return response.data;
  } catch (error) {
    console.error("Error creating info:", error);
    throw error;
  }
};

interface C1TaskFields {
  lead: LeadFields;
  calStartTime: string;
  repPageId: string;
  folderLink: string;
}
export const createC1Tasks = async ({
  lead,
  calStartTime,
  repPageId,
  folderLink,
}: C1TaskFields) => {
  await Promise.all([
    conductC1Task({
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: repPageId,
      time: calStartTime,
      studentId: lead.id,
      studentEmail: lead.contact.studentEmail,
      studentNumber: lead.contact.studentPhone,
      parentEmail: lead.contact.parentEmail,
      parentNumber: lead.contact.parentPhone,
    }),
    createDashboardTask({
      folderLink,
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: repPageId,
      time: calStartTime,
      studentEmail: lead.contact.studentEmail,
    }),
    createGCTask({
      studentName: lead.name,
      studentPageId: lead.pageId,
      repPageId: repPageId,
      time: calStartTime,
      studentId: lead.id,
      parentName: lead.contact.parentName,
      studentPhone: lead.contact.studentPhone,
      parentPhone: lead.contact.parentPhone,
    }),
  ]);
};
