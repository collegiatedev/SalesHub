import { google } from "googleapis";
import { GoogleAPI } from "../../types";

interface GetFolderParams extends GoogleAPI {
  folderId: string;
}
export const getFolder = async ({
  googleClient,
  folderId,
}: GetFolderParams): Promise<any> => {
  const drive = google.drive({ version: "v3", auth: googleClient });

  // API call to get the folder details
  const response = await drive.files.get({
    fileId: folderId,
    fields: "id, name, webViewLink, mimeType",
  });
  return response;
};
