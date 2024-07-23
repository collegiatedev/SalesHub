import { Request, RequestHandler, Response } from "express";
import { asyncHandler, checkBodyParams } from "../helpers";
import { notionClient } from "../../clients";
import {
  RequiredAcceleratorTaskFields,
  createAcceleratorTaskProps,
} from "../../utils/acceleratorTask";

export const createDashboard: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedParams =
      checkBodyParams<CreateStudentDashboardInDatabaseProps>(req, [
        "studentName",
        "studentPageId",
        "repPageId",
        "time",
        "folderLink",
        "studentEmail",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await createStudentDashboardInDatabase(validatedParams.params);

    return res.json({
      message: "Create Student Dashboard Task - Generated",
    });
  }
);

interface CreateStudentDashboardInDatabaseProps
  extends RequiredAcceleratorTaskFields {
  folderLink: string;
  studentEmail: string;
}
const createStudentDashboardInDatabase = async ({
  studentName,
  studentPageId,
  repPageId,
  time,
  folderLink,
  studentEmail,
}: CreateStudentDashboardInDatabaseProps) => {
  const CREATE_STUDENT_DASHBOARD_TASK = "c735d37a78cd43a28423a7caf9b37ab9";
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createAcceleratorTaskProps({
      studentName,
      studentPageId,
      repPageId,
      time,
      emoji: "🚁",
      taskName: "Create Student Dashboard",
      taskId: CREATE_STUDENT_DASHBOARD_TASK,
    })
  );
  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Directions",
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
                content: "Copy student name",
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
                content: "Open in a separate tab",
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
                content: "Add new item to Accelerator Dashboard",
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
                content: "Link the student with the lead field",
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
        divider: {},
      },
      {
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Open the Dashboard Page",
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
                  "Replace all 3 instances of <Student Full Name> with student’s full name",
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
                  "Replace <Folder Block> (in Logistics section) with the folder block",
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
                content: "Share the dashboard with the student email",
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
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Tutorial",
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
          is_toggleable: true,
          color: "default",
        },
      },
    ],
  });
  keyMap.set("c735d37a78cd43a28423a7caf9b37ab9", res.results);

  let promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")![2].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Open: ",
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
                      id: "271a7f07-e25d-4fbd-a215-d7449802ad0b",
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
              icon: {
                type: "emoji",
                emoji: "💡",
              },
              color: "gray_background",
            },
          },
        ],
      });
      keyMap.set("0a1c3b74-4396-4232-a3e4-7698d98fc7cf", res.results);
      console.log("Created: 0a1c3b74-4396-4232-a3e4-7698d98fc7cf");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")![10].id,
        children: [
          {
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "See ",
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
                      id: "c735d37a-78cd-43a2-8423-a7caf9b37ab9",
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
      keyMap.set("6d4f54a6-e22b-4876-893a-51cba6e6434e", res.results);
      console.log("Created: 6d4f54a6-e22b-4876-893a-51cba6e6434e");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")![8].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Copy Folder Block:",
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
      keyMap.set("789c9aa8-3491-4d68-a062-00f28db5fa0f", res.results);
      console.log("Created: 789c9aa8-3491-4d68-a062-00f28db5fa0f");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")![9].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Copy Student Email: ${studentEmail}`,
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
      keyMap.set("b2674ba5-02a1-4c98-9c77-4bf87cfb7e1d", res.results);
      console.log("Created: b2674ba5-02a1-4c98-9c77-4bf87cfb7e1d");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")![1].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: `Copy Full Name: ${studentName}`,
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
      keyMap.set("b82f7351-e1a0-4d38-aae9-6ab05a7679bd", res.results);
      console.log("Created: b82f7351-e1a0-4d38-aae9-6ab05a7679bd");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("789c9aa8-3491-4d68-a062-00f28db5fa0f")![0].id,
        children: [
          {
            bookmark: {
              caption: [],
              url: folderLink,
            },
          },
        ],
      });
      keyMap.set("d7c95761-003d-482f-93a8-84617b9e3eb1", res.results);
      console.log("Created: d7c95761-003d-482f-93a8-84617b9e3eb1");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];
};
