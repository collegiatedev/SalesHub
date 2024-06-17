import { Router, Request, Response } from "express";
import { notion } from "../utils/notion";

export const createRouter: Router = Router();

createRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { pageId, name } = req.query;

    const missingParams = [];
    if (!pageId) missingParams.push("pageId");
    if (!name) missingParams.push("name");
    if (missingParams.length > 0) {
      return res.status(400).json({
        message: `Missing required parameters: ${missingParams.join(", ")}`,
      });
    }

    const response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: pageId as string,
      },
      title: [
        {
          type: "text",
          text: {
            content: `${name as string}'s Info`,
            link: null,
          },
        },
      ],
      properties: {
        Name: {
          title: {},
        },
      },
      is_inline: true,
    });

    await notion.pages.update({
      page_id: pageId as string,
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

    return res.json({
      message: "table created, page updated",
    });
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({
      message: "Failed to create meeting",
      error,
    });
  }
});
