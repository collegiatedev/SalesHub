import { Request, Response } from "express";
import { asyncHandler, checkBodyParams, infoRouter } from "../routers";
import { notionClient } from "../../clients";

infoRouter.get(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const validatedParams = checkBodyParams<CreateInfoDatabaseInPageProps>(
      req,
      ["name", "pageId"]
    );

    if (!validatedParams.isValid)
      return res.status(400).json({
        message: validatedParams.error,
      });

    const infoId = await createInfoDatabaseInPage(validatedParams.params);

    return res.json({
      message: "Info Table - Generated, Student Page - Updated",
      infoId,
    });
  })
);

interface CreateInfoDatabaseInPageProps {
  name: string;
  pageId: string;
}
const createInfoDatabaseInPage = async ({
  name,
  pageId,
}: CreateInfoDatabaseInPageProps) => {
  const response = await notionClient.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: `${name}'s Info`,
          link: null,
        },
      },
    ],
    properties: {
      Name: {
        title: {},
      },
      Time: {
        date: {},
      },
    },
    is_inline: true,
  });

  await notionClient.pages.update({
    page_id: pageId,
    properties: {
      "db-ref": {
        rich_text: [
          {
            type: "text",
            text: {
              content: response.id,
            },
          },
        ],
      },
    },
  });

  return response.id;
};
