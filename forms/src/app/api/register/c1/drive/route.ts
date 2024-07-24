// own endpoint since we need to use oauth, combined with webhook logic later
import { oauthHandler } from "../../../_handlers";
import { createFolder } from "../../../_utils/drive/createFolder";
import { OUTREACH_ACCELERATOR_FOLDER } from "../../../constants";
import { updateLead, leadHelpers } from "../../../_utils/notion/updateLead";

type CreatedFolder = Awaited<ReturnType<typeof updateLead>>;

// todo: change to post
export const POST = oauthHandler<CreatedFolder>({
  // leadRef is reference to student's notion page in Accelerator CRM
  required: { body: ["name", "leadRef", "studentEmail", "parentEmail"] },
  handler: async (utilContext, _req, googleClient) => {
    const { name, leadRef, studentEmail, parentEmail } = utilContext;
    const folderName = `${name}'s Assets`;

    const folderRef = await createFolder({
      authClient: googleClient,
      folderName,
      parentFolderId: OUTREACH_ACCELERATOR_FOLDER,
      emailsToShareWith: [studentEmail, parentEmail],
    });
    const folderId = folderRef.id;

    // update lead page with folder ref
    const response = await updateLead(leadRef, {
      ...leadHelpers.setFolderRef(folderId as string),
    });
    return response;
  },
  useRedirect: false, // exposed to all clients, so don't redirect
});
