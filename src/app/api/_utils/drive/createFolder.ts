// src/utils/drive/createFolder.ts
import { google } from "googleapis";
import { authorizeDrive } from "./setup";

export const listFiles = async () => {
  const auth = await authorizeDrive();
  if (!auth) return false; // change me

  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name)",
  });

  const files = res.data.files;
  if (!files) return [];
  return files.map((file) => ({ id: file.id, name: file.name }));
};
