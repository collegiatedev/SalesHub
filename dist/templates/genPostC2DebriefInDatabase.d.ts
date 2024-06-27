export interface GenPostC2DebriefInDatabaseProps {
    parentId: string;
    name: string;
    type: string;
    challenges: string;
    value: string;
    alternatives: string;
}
export declare const genPostC2DebriefInDatabase: ({ parentId, name, type, challenges, value, alternatives, }: GenPostC2DebriefInDatabaseProps) => Promise<void>;
