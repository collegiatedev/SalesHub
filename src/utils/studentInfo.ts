import { EmojiRequest } from "./emojis";

export interface RequiredInfoFields {
  studentName: string;
  infoId: string;
  time: string;
}

interface InfoPageProps extends RequiredInfoFields {
  infoName: string;
  emoji: EmojiRequest;
}
export const createInfoPageProps = ({
  studentName,
  infoId,
  time,
  // should be provided by server
  infoName,
  emoji,
}: InfoPageProps) => {
  return {
    parent: {
      type: "database_id",
      database_id: infoId,
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
              content: `${studentName}'s ${infoName}`,
            },
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
