import { LEAD_DATABASE_ID, notionClient } from "~/app/api/_utils/constants";

export type CreatedLeadFields = {
  "Student Name": string;
  Grade: string;
  Major: string;
  School: string;
  id: string;
  "Parent Name": string;
  "Student's Email": string;
  "Student's Phone": string;
  "Parent's Email": string;
  "Parent's Phone": string;
  Origin: string[];
};
export const parseCreateLeadFields = (fields: any): CreatedLeadFields => {
  const getFieldValue = (label: string) => {
    const field = fields.find((f: any) => f.label === label);
    if (!field) return "";
    if (field.type === "MULTIPLE_CHOICE") {
      const selectedOptions = field.value.map(
        (value: string) =>
          field.options.find((option: any) => option.id === value)?.text
      );
      return selectedOptions.join(", ");
    }
    return field.value || "";
  };

  const parsedFields: CreatedLeadFields = {
    "Student Name": `${getFieldValue("student_first_name")} ${getFieldValue(
      "student_last_name"
    )}`,
    Grade: getFieldValue("Current Grade Level"),
    Major: getFieldValue("major"),
    School: `${getFieldValue("school")}, ${getFieldValue("state")}`,
    id: getFieldValue("id"),
    "Parent Name": `${getFieldValue("parent_first_name")} ${getFieldValue(
      "parent_last_name"
    )}`,
    "Student's Email": getFieldValue("student_email"),
    "Student's Phone": getFieldValue("student_number"),
    "Parent's Email": getFieldValue("parent_email"),
    "Parent's Phone": getFieldValue("parent_number"),
    Origin: getFieldValue("origin").split(", "),
  };

  return parsedFields;
};

export const createLead = async (fields: CreatedLeadFields) => {
  const response = await notionClient.pages.create({
    parent: { type: "database_id", database_id: LEAD_DATABASE_ID },
    properties: {
      "Student Name": {
        title: [
          {
            text: {
              content: fields["Student Name"],
            },
          },
        ],
      },
      Grade: {
        select: {
          name: fields.Grade,
        },
      },
      Major: {
        rich_text: [
          {
            text: {
              content: fields.Major,
            },
          },
        ],
      },
      School: {
        rich_text: [
          {
            text: {
              content: fields.School,
            },
          },
        ],
      },
      id: {
        rich_text: [
          {
            text: {
              content: fields.id,
            },
          },
        ],
      },
      "Parent Name": {
        rich_text: [
          {
            text: {
              content: fields["Parent Name"],
            },
          },
        ],
      },
      "Student's Email": {
        email: fields["Student's Email"],
      },
      "Student's Phone": {
        phone_number: fields["Student's Phone"],
      },

      "Parent's Email": {
        email: fields["Parent's Email"],
      },
      "Parent's Phone": {
        phone_number: fields["Parent's Phone"],
      },
      Origin: {
        multi_select: fields.Origin.map((origin) => ({
          name: origin,
        })),
      },
      Status: {
        select: {
          name: "Issue",
        },
      },
    },
  });

  return response;
};
