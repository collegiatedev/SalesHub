import { google } from "googleapis";

export const createFolder = async (
  authClient: any,
  folderName: string,
  parentFolderId: string
) => {
  const drive = google.drive({ version: "v3", auth: authClient });

  // parentFolderId should be const

  // API call to create the folder
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id, name",
  });

  // need to share it

  // Folder creation successful
  console.log(
    `Folder '${folderName}' created successfully with ID: ${response.data.id}`
  );
  return response.data;
};
