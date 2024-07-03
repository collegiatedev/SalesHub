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
export declare const createInfoPageProps: ({ studentName, infoId, time, infoName, emoji, }: InfoPageProps) => {
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
        Time: {
            date: {
                start: string;
                end: null;
                time_zone: null;
            };
        };
    };
};
export {};
