import { notionReadOnlyClient } from "src/clients";
import { HEADING_DIRECTORY, PARENT_ID_PLACEHOLDER } from "../constants";
import { createOutput, deleteDirectoryIfExists } from "./create";

export const outputDatabaseHeading = async (pageId: string) => {
  const page: any = await notionReadOnlyClient.pages.retrieve({
    page_id: pageId,
  });
  await deleteDirectoryIfExists(HEADING_DIRECTORY + pageId);

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
  const page: any = await notionReadOnlyClient.pages.retrieve({
    page_id: pageId,
  });
  await deleteDirectoryIfExists(HEADING_DIRECTORY + pageId);

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
            content: page.properties.Name.title[0].plain_text, // only works for db pages wtf
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
