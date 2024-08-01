import { google } from "googleapis";
import { GoogleAPI } from "./types";

interface UpdatePermsParams extends GoogleAPI {
  fileId: string;
  shareWith: string[];
}
export const updatePerms = async ({
  googleClient,
  fileId,
  shareWith,
}: UpdatePermsParams) => {
  const drive = google.drive({ version: "v3", auth: googleClient });
  return await Promise.all(
    shareWith.map(async (email) => {
      try {
        await drive.permissions.create({
          fileId,
          requestBody: {
            role: "writer",
            type: "user",
            emailAddress: email,
          },
        });
      } catch (error) {
        console.error(`Failed to update permissions for ${email}:`, error);
      }
    })
  );
};
