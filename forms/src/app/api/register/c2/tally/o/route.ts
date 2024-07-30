import { NextRequest } from "next/server";
import { SignatureTypes } from "../../../../_handlers/webhook";
import { reqHandler } from "~/app/api/_handlers";
import { getLead } from "~/app/api/_utils/notion/getLead";
import { getFieldValue } from "~/app/api/helpers";

export const POST = reqHandler<any>({
  internal: true,
  required: { body: ["fields"] },
  handler: async (utilContext: any, _req: NextRequest) => {
    const { payload } = utilContext;

    const lead = await getLead(cal.studentId);
  },
});
const parseTallyC2 = (fields: any): CreatedLeadFields => {
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
