import { Request, RequestHandler, Response } from "express";
import { asyncHandler, checkBodyParams } from "../helpers";
import { notionClient } from "../../clients";
import {
  createInfoPageProps,
  RequiredInfoFields,
} from "../../utils/studentInfo";

export const parentInsight: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedParams = checkBodyParams<ParentInsightInDatabaseProps>(req, [
      "studentName",
      "infoId",
      "whyNow",
      "programFit",
      "programSupport",
    ]);

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    await parentInsightInDatabase(validatedParams.params);

    return res.json({
      message: "Parent Insight Info - Generated",
    });
  }
);

interface ParentInsightInDatabaseProps extends RequiredInfoFields {
  whyNow: string;
  programFit: string;
  programSupport: string;
}
const parentInsightInDatabase = async ({
  studentName,
  infoId,
  whyNow,
  programFit,
  programSupport,
}: ParentInsightInDatabaseProps) => {
  const keyMap = new Map<string, Array<any>>();
  const page = await notionClient.pages.create(
    createInfoPageProps({
      studentName,
      infoId,
      infoName: "Parent Insight Response",
      emoji: "🔗",
    })
  );

  const supports = programSupport.split(",").map((support) => ({
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: {
            content: support,
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
    },
  }));

  let res = await notionClient.blocks.children.append({
    block_id: page.id,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Why Now?",
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
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: whyNow,
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
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Program Fit",
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
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: programFit,
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
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Program Support",
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
      // notion typing lazy fix
      // @ts-ignore
      ...supports,
      // @ts-ignore
      {
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
      // @ts-ignore
      {
        paragraph: {
          rich_text: [],
          color: "default",
        },
      },
    ],
  });
  keyMap.set("c4fc5284367a45519d15c9a0bad9f8bd", res.results);
};
