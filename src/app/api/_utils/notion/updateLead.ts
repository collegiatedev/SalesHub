import { notionClient } from "../constants";

export const updateLead = async (
  pageId: string,
  updateProperties: UpdatePropertiesType
) => {
  const response = await notionClient.pages.update({
    page_id: pageId,
    properties: updateProperties,
  });
  return response;
};

type UpdatePropertiesType = ReturnType<
  (typeof updateLeadHelpers)[keyof typeof updateLeadHelpers]
>;
// add to this object as we need more properties to update schema of
export const updateLeadHelpers = {
  setFolderRef: (folderRef: string) => {
    return {
      "folder-ref": {
        rich_text: [
          {
            text: {
              content: folderRef,
            },
          },
        ],
      },
    };
  },
};
