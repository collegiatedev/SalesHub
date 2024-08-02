import { google } from "googleapis";
import { GoogleAPI } from "../../types";
// great for debugging
export const listFiles = async ({ googleClient }: GoogleAPI) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name)",
  });

  const files = res.data.files;
  if (!files) return [];
  return files
    .filter(
      (file) =>
        file.id !== null &&
        file.id !== undefined &&
        file.name !== null &&
        file.name !== undefined
    )
    .map((file) => ({ id: file.id!, name: file.name! }));
};
