import { google } from "googleapis";
import { GoogleAPI } from "../../types";

interface CreateDocParams extends GoogleAPI {
  title: string;
}
// todo, folderId this
export const createDoc = async ({ googleClient, title }: CreateDocParams) => {
  const docs = google.docs({ version: "v1", auth: googleClient });
  const res = await docs.documents.create({
    requestBody: {
      title,
    },
  });

  return res.data.documentId;
};
