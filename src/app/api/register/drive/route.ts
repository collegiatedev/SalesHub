// own endpoint since we need to use oauth, combined with webhook logic later
import { oauthHandler } from "../../_utils/handlers";
import { createFolder } from "../../_utils/drive/createFolder";
import { OUTREACH_ACCELERATOR_FOLDER } from "../../_utils/constants";
import { updateLead } from "../../_utils/notion/updateLead";

type CreatedFolder = Awaited<ReturnType<typeof updateLead>>;

// todo: change to post
export const GET = oauthHandler<CreatedFolder>({
  // leadRef is reference to student's notion page in Accelerator CRM
  required: { params: ["name", "leadRef"] },
  handler: async (utilContext, googleClient) => {
    const { name, leadRef } = utilContext;

    const folderName = `${name}'s Assets`;
    const folderRef = await createFolder(
      googleClient,
      folderName,
      OUTREACH_ACCELERATOR_FOLDER
    );
    const folderId = folderRef.id;

    // update lead page with folder ref
    const response = await updateLead(leadRef, {
      "folder-ref": {
        rich_text: [
          {
            text: {
              content: folderId,
            },
          },
        ],
      },
    });
    return response;
  },
  useRedirect: false,
});
