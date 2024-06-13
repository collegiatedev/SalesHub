import fs from "fs";
import {
  CONTENT_DIRECTORY,
  HEADING_DIRECTORY,
  REQUEST_DIRECTORY,
} from "../constants";
import { createOutput } from "./create";

export const outputRequest = async (pageId: string) => {
  try {
    const headingData = fs.readFileSync(
      `${HEADING_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const headingJson = JSON.parse(headingData);

    const contentData = fs.readFileSync(
      `${CONTENT_DIRECTORY}${pageId}.json`,
      "utf8"
    );
    const contentJson = JSON.parse(contentData);

    const combinedJson = {
      ...headingJson,
      children: contentJson,
    };

    await createOutput({
      pageId,
      directory: REQUEST_DIRECTORY,
      content: combinedJson,
    });
  } catch (err) {
    console.error("Error combining JSON files:", err);
    throw err;
  }
};
