import { EmojiRequest } from "./emojis";

export const ACCELERATOR_TASKS_DB = "c152f19a8b944a0bebab93ad9da6da2";

export interface RequiredAcceleratorTaskFields {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  time: string;
}

interface AcceleratorTaskProps extends RequiredAcceleratorTaskFields {
  taskName: string;
  taskId: string;
  emoji: EmojiRequest;
}
export const createAcceleratorTaskProps = ({
  studentName,
  studentPageId,
  repPageId,
  time,
  // should be provided by server
  taskName,
  taskId,
  emoji,
}: AcceleratorTaskProps) => {
  return {
    parent: {
      type: "database_id",
      database_id: ACCELERATOR_TASKS_DB,
    } as { database_id: string; type: "database_id" },
    icon: {
      type: "emoji",
      emoji,
    } as { emoji: EmojiRequest; type: "emoji" },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `${studentName} - ${taskName}`,
            },
          },
        ],
      },
      "🚈 Lead": {
        relation: [
          {
            id: studentPageId,
          },
        ],
      },
      Assigned: {
        relation: [
          {
            id: repPageId,
          },
        ],
      },
      "🚅 Task": {
        relation: [
          {
            id: taskId,
          },
        ],
      },
      Time: {
        date: {
          start: time,
          end: null,
          time_zone: null,
        },
      },
    },
  };
};
