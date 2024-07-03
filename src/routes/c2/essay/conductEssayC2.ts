import { Request, RequestHandler, Response } from "express";
import { asyncHandler, checkBodyParams } from "../../helpers";
import { notionClient } from "../../../clients";
import {
  RequiredAcceleratorTaskFields,
  createAcceleratorTaskProps,
} from "../../../utils/acceleratorTask";

export const conductEssayC2: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedParams =
      checkBodyParams<ConductC2MeetingEssayInDatabaseProps>(req, [
        "studentName",
        "studentPageId",
        "repPageId",
        "time",
        "studentId",
        "essayDocLink",
        "repName",
        "leadRepId",
      ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await conductC2MeetingEssayInDatabase(validatedParams.params);

    return res.json({
      message: "Conduct Essay Editing C2 Meeting Task - Generated",
    });
  }
);

const CONDUCT_C2_MEETING_ESSAY_TASK = "0248e350f0d34aafab6b28b0d8b86e59";

export interface ConductC2MeetingEssayInDatabaseProps
  extends RequiredAcceleratorTaskFields {
  studentId: string;
  essayDocLink: string;
  repName: string;
  leadRepId: string;
}

export const conductC2MeetingEssayInDatabase = async ({
  studentName,
  studentPageId,
  repPageId,
  time,
  studentId,
  essayDocLink,
  repName,
  leadRepId,
}: ConductC2MeetingEssayInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createAcceleratorTaskProps({
      studentName,
      studentPageId,
      repPageId,
      time,
      emoji: "2️⃣",
      taskName: "Conduct C2 Meeting - Essay Editing",
      taskId: CONDUCT_C2_MEETING_ESSAY_TASK,
    })
  );
  const c3Link = `https://www.collegiate.dev/c3?id=${studentId}`;
  const tallyLink = `https://tally.so/r/3yyQ1B?id=${studentId}&fullname=${studentName}&type=Personal%20Brand&repName=${repName}&leadRepId=${leadRepId}`;

  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Introduction",
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
      {
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "During",
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
      {
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "After",
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
        callout: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Complete this form after the call ",
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
                content: "(MANDATORY)",
                link: null,
              },
              annotations: {
                bold: true,
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
            emoji: "⬇️",
          },
          color: "gray_background",
        },
      },
      {
        embed: {
          caption: [],
          url: tallyLink,
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
  keyMap.set("0248e350f0d34aafab6b28b0d8b86e59", res.results);

  let promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("0248e350f0d34aafab6b28b0d8b86e59")![1].id,
        children: [
          {
            heading_3: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Activity",
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
                      "Open up this doc and send the link into the Zoom chat. The doc is already shared with the student:",
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
                    content:
                      "Share your screen and explain the revisions you made",
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
                    content:
                      "Have the student complete the revisions and provide feedback on how well they incorporate their suggestions: ",
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
                    content: "Wrapping Up",
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
                    content:
                      "“With our progress on your essay so far, I have a couple questions before we wrap up our meeting shortly”",
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
                    content:
                      "“It was great working with you, and developing a compelling essay is not an overnight process—so it’s perfectly normal if we haven’t finalized everything yet”",
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
      keyMap.set("17c4342a-c494-407c-8cf4-9a645306b785", res.results);
      console.log("Created: 17c4342a-c494-407c-8cf4-9a645306b785");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("0248e350f0d34aafab6b28b0d8b86e59")![0].id,
        children: [
          {
            to_do: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Check the “Post-C1 Debrief” under ",
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
                      id: studentPageId,
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
                    content: " for name pronunciation",
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
                    content: "Wait for student to join the call",
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
                      "Once you’re ready to start, say “I want to make the most out of your time today, so I’ll briefly introduce my background”",
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
                    content: "Explain your background (",
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
                    content: "Name",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "red_background",
                  },
                },
                {
                  type: "text",
                  text: {
                    content: " → ",
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
                    content: "Experience",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "green_background",
                  },
                },
                {
                  type: "text",
                  text: {
                    content: " → ",
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
                    content: "Impact",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "blue_background",
                  },
                },
                {
                  type: "text",
                  text: {
                    content: " → ",
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
                    content: "Ask",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "purple_background",
                  },
                },
                {
                  type: "text",
                  text: {
                    content: ")",
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
      keyMap.set("b33359ee-301c-4f76-b30a-935d20d75c8c", res.results);
      console.log("Created: b33359ee-301c-4f76-b30a-935d20d75c8c");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("17c4342a-c494-407c-8cf4-9a645306b785")![3].id,
        children: [
          {
            callout: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Use ",
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
              icon: {
                type: "emoji",
                emoji: "💡",
              },
              color: "gray_background",
            },
          },
        ],
      });
      keyMap.set("1c01573b-1340-45f7-a5c6-cabe5de4a74d", res.results);
      console.log("Created: 1c01573b-1340-45f7-a5c6-cabe5de4a74d");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("17c4342a-c494-407c-8cf4-9a645306b785")![5].id,
        children: [
          {
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content:
                      "”What did you find most helpful during our meeting” ",
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
                    content:
                      "“What do you feel like you need more help to improve your essay”",
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
                    content:
                      "“I also wanted to confirm if you were able to schedule your third call with us, with one of your parents also being able to attend” ",
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
      keyMap.set("7033154a-686a-49a2-9a85-2305e853d77b", res.results);
      console.log("Created: 7033154a-686a-49a2-9a85-2305e853d77b");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("17c4342a-c494-407c-8cf4-9a645306b785")![1].id,
        children: [
          {
            bookmark: {
              caption: [],
              url: essayDocLink,
            },
          },
        ],
      });
      keyMap.set("8194f005-84da-4f7d-b3e6-17a037e81540", res.results);
      console.log("Created: 8194f005-84da-4f7d-b3e6-17a037e81540");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("b33359ee-301c-4f76-b30a-935d20d75c8c")![1].id,
        children: [
          {
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content:
                      "Request that they turn on their camera if it is off",
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
                    content: "Confirm that audio works for both sides",
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
      keyMap.set("689a34d9-5f90-4716-ad1f-03cc3c44cfce", res.results);
      console.log("Created: 689a34d9-5f90-4716-ad1f-03cc3c44cfce");
    })()
  );

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("b33359ee-301c-4f76-b30a-935d20d75c8c")![3].id,
        children: [
          {
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "ex: ",
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
                    content: "My name is Jesse,",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "red_background",
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
                {
                  type: "text",
                  text: {
                    content: "I’m a current junior studying CS at UIUC.",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "green_background",
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
                {
                  type: "text",
                  text: {
                    content:
                      "As a mentor at Collegiate, I’ve guided students through the application process—specifically to help them develop a unique personal brand.",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "blue_background",
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
                {
                  type: "text",
                  text: {
                    content:
                      "Before we get started, can I ask you why you were interested in working on this module specifically?",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "purple_background",
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
                    content:
                      "Respond with: “That’s perfect, I’ve helped multiple students with ",
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
                    content: "<insert the reason they gave>",
                    link: null,
                  },
                  annotations: {
                    bold: true,
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
                    content:
                      ", and I can get you started right now with this today’s exercise”",
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
      keyMap.set("7dc2851d-8b93-49d6-b008-056a4819eea9", res.results);
      console.log("Created: 7dc2851d-8b93-49d6-b008-056a4819eea9");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("7033154a-686a-49a2-9a85-2305e853d77b")![2].id,
        children: [
          {
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Send them this link if they haven’t registered: ",
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
      keyMap.set("bf7e3c1c-ddc0-4059-8180-dc56c7f2cbf5", res.results);
      console.log("Created: bf7e3c1c-ddc0-4059-8180-dc56c7f2cbf5");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];
};
