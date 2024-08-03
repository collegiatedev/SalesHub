import { google } from "googleapis";
import { FileUpload, GoogleAPI } from "../../types";

interface UploadFileParams extends GoogleAPI {
  file: FileUpload;
}

export const uploadFile = async ({ googleClient, file }: UploadFileParams) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  const { folderId, fileName, mimeType, fileStream } = file;

  // Metadata for the file to be uploaded
  const fileMetadata = {
    name: fileName,
    parents: folderId ? [folderId] : [],
  };

  // API call to upload the file
  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType,
      body: fileStream,
    },
    fields: "id, name, webViewLink, mimeType",
  });

  return response.data;
};
