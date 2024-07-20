// src/utils/drive/createFolder.ts
import { google } from "googleapis";
import { authorizeDrive } from "./setup";

export async function listFiles() {
  try {
    const auth = await authorizeDrive();
    if (!auth) return false;

    const drive = google.drive({ version: "v3", auth });

    const res = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });

    const files = res.data.files;
    if (files && files.length) {
      console.log("Files:");
      files.forEach((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log("No files found.");
    }

    return true;
  } catch (error) {
    console.error("The API returned an error:", error);
    return false;
  }
}
