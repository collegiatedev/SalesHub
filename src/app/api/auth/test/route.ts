import { google } from "googleapis";
import { oauthHandler } from "../../_utils/handlers";

type ListFilesResponse = Array<{ id: string; name: string }>;

export const GET = oauthHandler<ListFilesResponse>({
  required: { params: [] },
  handler: async (_, googleClient) => {
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
  },
});
