import { notion } from "../utils/notion";

export interface CreateDatabaseInPageProps {
  pageId: string;
  name: string;
}

export const createDatabaseInPage = async ({
  name,
  pageId,
}: CreateDatabaseInPageProps) => {
  const response = await notion.databases.create({
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
    },
    is_inline: true,
  });

  await notion.pages.update({
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
};
