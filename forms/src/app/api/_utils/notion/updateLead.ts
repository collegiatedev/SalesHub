import { notionClient } from "../../constants";

export const updateLead = async (
  pageId: string,
  updateProperties: UpdatePropertiesType
) => {
  const response = await notionClient.pages.update({
    page_id: pageId,
    properties: {
      ...updateProperties,
    },
  });
  return response;
};

type UpdatePropertiesType = ReturnType<
  (typeof leadHelpers)[keyof typeof leadHelpers]
>;
// add to this object as we need more properties to update schema of
export const leadHelpers = {
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
  setLeadRep: (leadRep: string) => {
    return {
      "Lead Rep": {
        relation: [
          {
            id: leadRep,
          },
        ],
      },
    };
  },
  setModuleRep: (moduleRep: string) => {
    return {
      "Module Rep": {
        relation: [
          {
            id: moduleRep,
          },
        ],
      },
    };
  },
  setStatus: (status: Statuses) => {
    return {
      Status: {
        select: {
          name: status,
        },
      },
    };
  },
  setCompletedStages: (completedStages: Stages[]) => {
    return {
      "Completed Stages": {
        multi_select: completedStages.map((stage) => ({
          name: stage,
        })),
      },
    };
  },
  setLatestMeeting: (lastest: string) => {
    return {
      "Latest Meeting": {
        date: {
          start: lastest,
        },
      },
    };
  },
};
// exend when needed
export enum Statuses {
  Issue = "Issue",
  Ongoing = "Ongoing",
}
export enum Stages {
  C0 = "C0",
  C1 = "C1",
  C2 = "C2",
  C3 = "C3",
}
