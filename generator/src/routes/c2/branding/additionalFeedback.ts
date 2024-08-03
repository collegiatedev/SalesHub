import { Request, RequestHandler, Response } from "express";
import { asyncHandler, checkBodyParams } from "../../helpers";
import { notionClient } from "../../../clients";
import {
  RequiredAcceleratorTaskFields,
  createAcceleratorTaskProps,
} from "../../../utils/acceleratorTask";

export const additionalFeedback: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedParams =
      checkBodyParams<AdditionalFeedbackToPBInDatabaseProps>(
        req,
        ["studentName", "studentPageId", "repPageId", "time", "pbDocLink"],
        ["dashboardPageId"]
      );

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await additionalFeedbackToPBInDatabase(validatedParams.params);

    return res.json({
      message: "Give Additional Feedback to Personal Brand Task - Generated",
    });
  }
);

interface AdditionalFeedbackToPBInDatabaseProps
  extends RequiredAcceleratorTaskFields {
  pbDocLink: string;
  dashboardPageId?: string;
}
const additionalFeedbackToPBInDatabase = async ({
  studentName,
  studentPageId,
  repPageId,
  time,
  pbDocLink,
  dashboardPageId,
}: AdditionalFeedbackToPBInDatabaseProps) => {
  const GIVE_ADDITIONAL_FEEDBACK_TO_PB_TASK =
    "63c03a42c94d4d38b30835434dd22e01";
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createAcceleratorTaskProps({
      studentName,
      studentPageId,
      repPageId,
      time,
      emoji: "2️⃣",
      taskName: "Conduct C2 Meeting - Personal Brand",
      taskId: GIVE_ADDITIONAL_FEEDBACK_TO_PB_TASK,
    })
  );

  const dashboardFallback = dashboardPageId
    ? {
        type: "mention" as const,
        mention: {
          database: {
            id: dashboardPageId,
          },
        },
      }
    : {
        type: "text" as const,
        text: {
          content: "Dashboard not provided",
        },
      };

  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Tasks",
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
                content: "Leave ",
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
                content: "4-5 comments per category",
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
                content: " (~20 total) via ",
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
                  id: "55daf4db-3278-43c6-9618-01ef002ff616",
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
                content: "Link the ",
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
                  id: "db61bc61120b41479894b6da15d9ee69",
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
                content: " (type ‘@Exemplar Personal Brand’) into ",
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
            dashboardFallback,
            {
              type: "text",
              text: {
                content: " under the Resources section",
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
  keyMap.set("63c03a42c94d4d38b30835434dd22e01", res.results);

  let promises = [];

  promises.push(
    (async () => {
      const res = await notionClient.blocks.children.append({
        block_id: keyMap.get("63c03a42c94d4d38b30835434dd22e01")![1].id,
        children: [
          {
            bookmark: {
              caption: [],
              url: pbDocLink,
            },
          },
        ],
      });
      keyMap.set("3df7cc04-0a02-46fd-9199-929fcae10288", res.results);
      console.log("Created: 3df7cc04-0a02-46fd-9199-929fcae10288");
    })()
  );

  await Promise.all(promises);
  console.log("Done with batch");
  promises = [];
};
