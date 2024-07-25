import { EmojiRequest } from "./emojis";
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
export declare const createAcceleratorTaskProps: ({ studentName, studentPageId, repPageId, time, taskName, taskId, emoji, }: AcceleratorTaskProps) => {
    parent: {
        database_id: string;
        type: "database_id";
    };
    icon: {
        emoji: EmojiRequest;
        type: "emoji";
    };
    properties: {
        Name: {
            title: {
                text: {
                    content: string;
                };
            }[];
        };
        "\uD83D\uDE88 Lead": {
            relation: {
                id: string;
            }[];
        };
        Assigned: {
            relation: {
                id: string;
            }[];
        };
        "\uD83D\uDE85 Task": {
            relation: {
                id: string;
            }[];
        };
        Time: {
            date: {
                start: string;
                end: null;
                time_zone: null;
            };
        };
        Status: {
            select: {
                name: string;
            };
        };
    };
};
export {};
