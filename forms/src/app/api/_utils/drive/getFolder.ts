import { google } from "googleapis";

export const getFolder = async ({
  authClient,
  folderId,
}: {
  authClient: any;
  folderId: string;
}) => {
  const drive = google.drive({ version: "v3", auth: authClient });

  // API call to get the folder details
  const response = await drive.files.get({
    fileId: folderId,
    fields: "id, name, webViewLink, mimeType",
  });
  return response;
};
