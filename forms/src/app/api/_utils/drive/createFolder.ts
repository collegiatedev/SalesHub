import { google } from "googleapis";

interface CreateFolderParams {
  authClient: any;
  folderName: string;
  parentFolderId: string;
  emailsToShareWith: string[];
}
export const createFolder = async ({
  authClient,
  folderName,
  parentFolderId,
  emailsToShareWith,
}: CreateFolderParams) => {
  const drive = google.drive({ version: "v3", auth: authClient });

  // API call to create the folder
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id, name",
  });

  const folderId = response.data.id;

  // Share the folder with specified email addresses
  await Promise.all(
    emailsToShareWith.map(async (email) => {
      await drive.permissions.create({
        fileId: folderId as string,
        requestBody: {
          role: "writer",
          type: "user",
          emailAddress: email,
        },
      });
    })
  );

  // Folder creation and sharing successful
  console.log(
    `Folder '${folderName}' created successfully with ID: ${folderId}`
  );
  return response.data;
};
