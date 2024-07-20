import { notionClient } from "../constants";

export const updateLead = async (pageId: string, updateProperties: any) => {
  const response = await notionClient.pages.update({
    page_id: pageId,
    // properties: {
    //   "In stock": {
    //     checkbox: true,
    //   },
    // },
    properties: {
      "folder-ref": {
        rich_text: [
          {
            text: {
              content: "hi",
            },
          },
        ],
      },
    },
  });
  return response;
};
