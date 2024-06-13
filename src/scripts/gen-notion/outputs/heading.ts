import { HEADING_DIRECTORY, notion } from "../constants";
import { createOutput } from "./create";

export const outputHeading = async (pageId: string) => {
  const page: any = await notion.pages.retrieve({ page_id: pageId });

  // notion heading data shape >:(
  const heading = {
    icon: page.icon,
    properties: {
      Name: {
        title: [
          {
            text: {
              content: page.properties.Name.title[0].plain_text,
            },
          },
        ],
      },
    },
  };

  await createOutput({
    pageId,
    directory: HEADING_DIRECTORY,
    content: heading,
  });
};
