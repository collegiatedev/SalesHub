import { google } from "googleapis";
import { OUTREACH_ACCELERATOR_FOLDER } from "../../constants";
import { leadHelpers, updateLead } from "../notion/updateLead";

// crates folder, then updates lead page with folder ref
interface CreateStudentFolderProps {
  googleClient: any;
  lead: {
    leadRef: string;
    name: string;
    studentEmail: string;
    parentEmail: string;
  };
}
export const createStudentFolder = async ({
  googleClient,
  lead,
}: CreateStudentFolderProps) => {
  const folderName = `${lead.name}'s Assets`;

  const folderRef = await createFolder({
    folderName,
    authClient: googleClient,
    parentFolderId: OUTREACH_ACCELERATOR_FOLDER,
    emailsToShareWith: [lead.studentEmail, lead.parentEmail],
  });
  const folderId = folderRef.data.id;

  await updateLead(lead.leadRef, {
    ...leadHelpers.setFolderRef(folderId as string),
  });
};

// craetes folder in drive
interface CreateFolderParams {
  authClient: any;
  folderName: string;
  parentFolderId: string;
  emailsToShareWith: string[];
}
const createFolder = async ({
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

  return response;
};
