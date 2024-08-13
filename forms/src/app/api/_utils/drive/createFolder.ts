import { google } from "googleapis";
import { updatePerms } from "./updatePerms";
import { GoogleAPI } from "../../types";
import { AccountType } from "../../_handlers/oauth";

interface CreateFolderParams extends GoogleAPI {
  folderName: string;
  shareWith?: string[];
  parents?: string[];
}
// "eventually" will sync this with middleware
export const createFolder = async ({
  googleClient,
  folderName,
  shareWith = [],
  parents = [],
}: CreateFolderParams) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  // make more robust later
  try {
    const response = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents,
      },
      fields: "id, name, webViewLink",
    });

    const fileId = response.data.id as string;
    shareWith && (await updatePerms({ googleClient, fileId, shareWith }));
    return {
      folderId: fileId,
      webViewLink: response.data.webViewLink as string,
    };
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
