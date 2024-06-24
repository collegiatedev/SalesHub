import { notionClient } from "../utils/clients";

export interface GenerateContactInfoInDatabaseProps {
  parentId: string;
  studentEmail: string;
  studentPhone: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  parentName: string;
}
export const generateContactInfoInDatabase = async ({
  parentId,
  studentEmail,
  studentPhone,
  parentEmail,
  parentPhone,
  studentName,
  parentName,
}: GenerateContactInfoInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create({
    parent: {
      type: "database_id",
      database_id: parentId,
    },
    icon: {
      type: "emoji",
      emoji: "📞",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `${studentName}'s Contact Info`,
            },
          },
        ],
      },
    },
  });
  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Student",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: false,
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `email: ${studentEmail}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `phone: ${studentPhone}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Parent",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          is_toggleable: false,
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `name: ${parentName}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `email: ${parentEmail}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
      {
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `phone: ${parentPhone}`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("1f9f9997ab4441e2a4be000dbc14e9da", res.results);
};
