import axios from "axios";
import { SERVER_URL } from "../../constants";
import { generatorEndpoint } from "../../helpers";

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
const conductEssayTask = async (body: ConductEssay) =>
  await generatorEndpoint({
    route: "/c2/essay/conduct",
    body,
  });

type EditEssay = {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
  docLink: string;
  fileLink: string;
};
const editEssayTask = async (body: EditEssay) =>
  await generatorEndpoint({
    route: "/c2/essay/edit",
    body,
  });
