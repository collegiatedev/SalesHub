import { generateId } from "~/lib/id";
import {
  notionClient,
  LEAD_DATABASE_ID,
  INITIAL_TALLY_STATUS,
} from "../../constants";

export type CreatedLeadFields = {
  id?: string;
  "Student Name": string;
  Grade: string;
  Major: string;
  School: string;
  "Parent Name": string;
  "Student's Email": string;
  "Student's Phone": string;
  "Parent's Email": string;
  "Parent's Phone": string;
  Origin: string[];
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
              content: fields.id ? fields.id : generateId(), // id is generated if not provided
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
          name: INITIAL_TALLY_STATUS,
        },
      },
    },
  });

  return response;
};
