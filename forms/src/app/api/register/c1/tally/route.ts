import { leadHelpers, updateLead } from "~/app/api/_utils/notion/updateLead";
import { createOutreachFolder } from "~/app/api/_utils/drive/createFolder";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";
import { createInfoTable, contactInfo } from "~/app/api/_utils/generator/info";
import {
  CreatedLeadFields,
  createLead,
} from "~/app/api/_utils/notion/createLead";

export const POST = outputHandler<CreatedLeadFields>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const studentName = input["Student Name"];
    const [{ id: leadId }, folderId] = await Promise.all([
      createLead(input),
      createOutreachFolder({
        googleClient,
        studentName,
        shareWith: [input["Student's Email"], input["Parent's Email"]],
      }),
    ]);

    const { infoId } = await createInfoTable({ leadId, studentName });

    await Promise.all([
      contactInfo({ infoId, leadFields: input }),
      updateLead(leadId, {
        ...leadHelpers.setFolderRef(folderId),
        ...leadHelpers.setInfoId(infoId),
      }),
    ]);

    return input;
  },
});
