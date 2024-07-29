import { google } from "googleapis";
import { OUTREACH_ACCELERATOR_FOLDER } from "../../constants";

interface CreateFolderParams {
  studentName: string;
  googleClient: any;
  shareWith: string[];
}
export const createOutreachFolder = async ({
  googleClient,
  studentName,
  shareWith,
}: CreateFolderParams) => {
  const folderName = `${studentName}'s Assets`;

  const drive = google.drive({ version: "v3", auth: googleClient });
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [OUTREACH_ACCELERATOR_FOLDER],
    },
    fields: "id, name",
  });

  const fileId = response.data.id as string;
  await Promise.all(
    shareWith.map(async (email) => {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "writer",
          type: "user",
          emailAddress: email,
        },
      });
    })
  );

  return response.data.id as string; // folderId
};
