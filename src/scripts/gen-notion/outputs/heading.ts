import { HEADING_DIRECTORY, notion, PARENT_ID_PLACEHOLDER } from "../constants";
import { createOutput } from "./create";

export const outputDatabaseHeading = async (pageId: string) => {
  const page: any = await notion.pages.retrieve({ page_id: pageId });

  // notion heading data shape >:(
  const heading = {
    parent: {
      type: "database_id",
      database_id: PARENT_ID_PLACEHOLDER,
    },
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
    subfolder: false,
  });
};

export const outputPageHeading = async (pageId: string) => {
  const page: any = await notion.pages.retrieve({ page_id: pageId });

  // notion heading data shape >:(
  const heading = {
    parent: {
      type: "page_id",
      page_id: PARENT_ID_PLACEHOLDER, // special placeholder for pageId
    },
    icon: page.icon,
    properties: {
      title: [
        {
          text: {
            content: page.properties.Name.title[0].plain_text,
          },
        },
      ],
    },
  };

  await createOutput({
    pageId,
    directory: HEADING_DIRECTORY,
    content: heading,
    subfolder: false,
  });
};
