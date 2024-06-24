import { notionClient } from "../utils/clients";

export interface GenerateEditStudentEssayInDatabaseProps {
  parentId: string;
}
export const generateEditStudentEssayInDatabase = async ({
  parentId,
}: GenerateEditStudentEssayInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create({
    parent: {
      type: "database_id",
      database_id: parentId,
    },
    icon: {
      type: "emoji",
      emoji: "🔥",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "Edit Student Essay",
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
                content: "Essay Editing",
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
        numbered_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Copy and paste the text content from the student’s essay file upload into their doc",
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
        numbered_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Give essay feedback based on the ",
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
            {
              type: "mention",
              mention: {
                page: {
                  id: "2ed05a54-2ad3-4c2f-a98e-df4e57273494",
                },
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
            {
              type: "text",
              text: {
                content: " ",
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
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("0d286379401143628168cbf237940f66", res.results);

  let promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("0d286379401143628168cbf237940f66")![1].id,
        children: [
          {
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "student file: <>",
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
                    content: "student doc: <>",
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
      keyMap.set("3d9b3e96-3c0e-48e3-b975-7cecedea8bef", res.results);
      console.log("Created: 3d9b3e96-3c0e-48e3-b975-7cecedea8bef");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];
};
