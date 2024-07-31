import {
  CreatedLeadFields,
  createLead,
} from "../../../../_utils/notion/createLead";
import {
  createInfoTable,
  contactInfo,
} from "../../../../_utils/generator/info";
import { getFieldValue } from "~/app/api/helpers";
import { leadHelpers, updateLead } from "~/app/api/_utils/notion/updateLead";
import { createOutreachFolder } from "~/app/api/_utils/drive/createFolder";
import { HandlerTypes, outputHandler } from "~/app/api/_handlers/output";

export const POST = outputHandler<CreatedLeadFields>({
  type: HandlerTypes.OAuth,
  handler: async (input, googleClient) => {
    const leadFields = parseTallyC1(input);
    const studentName = leadFields["Student Name"];

    const [{ id: leadId }, folderId] = await Promise.all([
      createLead(leadFields),
      createOutreachFolder({
        googleClient,
        studentName,
        shareWith: [
          leadFields["Student's Email"],
          leadFields["Parent's Email"],
        ],
      }),
    ]);

    const { infoId } = await createInfoTable({ leadId, studentName });

    await Promise.all([
      contactInfo({ infoId, leadFields }),
      updateLead(leadId, {
        ...leadHelpers.setFolderRef(folderId),
        ...leadHelpers.setInfoId(infoId),
      }),
    ]);

    return leadFields;
  },
});
const parseTallyC1 = (fields: any): CreatedLeadFields => {
  const gfv = (label: string) => getFieldValue(label, fields);
  return {
    "Student Name": `${gfv("student_first_name")} ${gfv("student_last_name")}`,
    Grade: gfv("Current Grade Level"),
    Major: gfv("major"),
    School: `${gfv("school")}, ${gfv("state")}`,
    id: gfv("id"),
    "Parent Name": `${gfv("parent_first_name")} ${gfv("parent_last_name")}`,
    "Student's Email": gfv("student_email"),
    "Student's Phone": gfv("student_number"),
    "Parent's Email": gfv("parent_email"),
    "Parent's Phone": gfv("parent_number"),
    Origin: gfv("origin").split(", "),
  };
};
