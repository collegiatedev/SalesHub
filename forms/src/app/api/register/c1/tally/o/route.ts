import {
  CreatedLeadFields,
  createLead,
} from "../../../../_utils/notion/createLead";
import {
  createInfoTable,
  contactInfo,
} from "../../../../_utils/generator/info";
import { NextRequest } from "next/server";
import { getFieldValue } from "~/app/api/helpers";
import { leadHelpers, updateLead } from "~/app/api/_utils/notion/updateLead";
import { oauthHandler } from "~/app/api/_handlers/oauth";
import { createOutreachFolder } from "~/app/api/_utils/drive/createFolder";

export const POST = oauthHandler<CreatedLeadFields>({
  required: { body: ["fields"] },
  handler: async (utilContext: any, _req: NextRequest, googleClient: any) => {
    const { fields } = utilContext;
    const leadFields = parseTallyC1Registration(fields);
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
const parseTallyC1Registration = (fields: any): CreatedLeadFields => {
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
