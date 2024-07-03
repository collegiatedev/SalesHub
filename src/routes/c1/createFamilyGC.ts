import { Request, RequestHandler, Response } from "express";
import { asyncHandler, checkBodyParams } from "../helpers";
import { notionClient } from "../../clients";
import {
  RequiredAcceleratorTaskFields,
  createAcceleratorTaskProps,
} from "../../utils/acceleratorTask";

export const createFamilyGC: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedParams = checkBodyParams<CreateFamilyGCInDatabaseProps>(
      req,
      [
        "studentName",
        "repPageId",
        "studentPageId",
        "time",
        "parentName",
        "studentPhone",
        "parentPhone",
      ]
    );

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await createFamilyGCInDatabase(validatedParams.params);

    return res.json({
      message: "Create Family GC Task - Generated",
    });
  }
);

const CREATE_FAMILY_GC_TASK = "5576b4a91e2f45999e1e209f467b60be";

interface CreateFamilyGCInDatabaseProps extends RequiredAcceleratorTaskFields {
  studentId: string;
  parentName: string;
  studentPhone: string;
  parentPhone: string;
}
const createFamilyGCInDatabase = async ({
  studentName,
  studentPageId,
  repPageId,
  time,
  studentId,
  parentName,
  studentPhone,
  parentPhone,
}: CreateFamilyGCInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createAcceleratorTaskProps({
      studentName,
      studentPageId,
      repPageId,
      time,
      emoji: "💬",
      taskName: "Create Family GC",
      taskId: CREATE_FAMILY_GC_TASK,
    })
  );

  const c2Link = `https://www.collegiate.dev/c2?id=${studentId}`; // TODO: adjust the infra
  const c3Link = `https://www.collegiate.dev/c3?id=${studentId}`; // TODO: adjust the infra

  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_3: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Todos",
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
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Make a GC using the Outreach Google Voice Number",
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
          checked: false,
          color: "default",
        },
      },
      {
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Send the text:",
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
          checked: false,
          color: "default",
        },
      },
      {
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Send any relevant links as discussed on call; make sure links are marked C1 and ready (checked off): ",
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
                database: {
                  id: "d85f4b37-0dd2-44a1-9482-1b7abc049392",
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
          checked: false,
          color: "default",
        },
      },
      {
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Name the contacts:",
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
          checked: false,
          color: "default",
        },
      },
    ],
  });
  keyMap.set("5576b4a91e2f45999e1e209f467b60be", res.results);

  let promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")![4].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `${studentName} (Student)\n${parentName} (${studentName}’s Parent)`,
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
              icon: {
                type: "emoji",
                emoji: "📄",
              },
              color: "gray_background",
            },
          },
        ],
      });
      keyMap.set("314c9e5a-3c1e-4f9e-8435-407e13ede42e", res.results);
      console.log("Created: 314c9e5a-3c1e-4f9e-8435-407e13ede42e");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")![1].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Student: ${studentName}, ${studentPhone}\nParent: ${parentName}, ${parentPhone}`,
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
              icon: {
                type: "emoji",
                emoji: "💡",
              },
              color: "gray_background",
            },
          },
        ],
      });
      keyMap.set("738fb89a-74ab-414c-8984-a50178e9b57b", res.results);
      console.log("Created: 738fb89a-74ab-414c-8984-a50178e9b57b");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("5576b4a91e2f45999e1e209f467b60be")![2].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Hi ${studentName} and Family, it was a pleasure meeting! Here are the forms to complete to continue with Collegiate:`,
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
              icon: {
                type: "emoji",
                emoji: "✉️",
              },
              color: "gray_background",
            },
          },
        ],
      });
      keyMap.set("e5419a2f-bcd6-48b6-a13e-352a388def7f", res.results);
      console.log("Created: e5419a2f-bcd6-48b6-a13e-352a388def7f");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("e5419a2f-bcd6-48b6-a13e-352a388def7f")![0].id,
        children: [
          {
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "1. For Student: ",
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
                  type: "text",
                  text: {
                    content: c2Link,
                    link: {
                      url: c2Link,
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
                    content: "\n2. For Parent: ",
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
                  type: "text",
                  text: {
                    content: c3Link,
                    link: {
                      url: c3Link,
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
              ],
              color: "default",
            },
          },
        ],
      });
      keyMap.set("a813f05a-70fa-41ce-8526-a67e7a6e1079", res.results);
      console.log("Created: a813f05a-70fa-41ce-8526-a67e7a6e1079");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];
};
