import { tallyInputHandler } from "~/app/api/_handlers/input";
import { CreatedLeadFields } from "~/app/api/_utils/notion/createLead";
import { fieldToArray, getFieldValue } from "~/app/api/helpers";
import { generateId } from "~/lib/id";

// using accelerator registration tally webhook
const parseTallyC1 = (fields: unknown): CreatedLeadFields => {
  const gfv = (label: string) => getFieldValue(label, fields);
  return {
    id: gfv("id") || generateId(), // id is generated if not provided
    Grade: gfv("Current Grade Level"),
    Major: gfv("major"),
    School: `${gfv("school")}, ${gfv("state")}`,
    Origin: fieldToArray(gfv("origin")),
    "Student Name": `${gfv("student_first_name")} ${gfv("student_last_name")}`,
    "Parent Name": `${gfv("parent_first_name")} ${gfv("parent_last_name")}`,
    "Student's Email": gfv("student_email"),
    "Student's Phone": gfv("student_number"),
    "Parent's Email": gfv("parent_email"),
    "Parent's Phone": gfv("parent_number"),
  };
};

export const POST = tallyInputHandler({
  route: "/api/register/c1/tally",
  parser: parseTallyC1,
});
