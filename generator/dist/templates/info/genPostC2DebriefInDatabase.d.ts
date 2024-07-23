export interface GenPostC2DebriefInDatabaseProps {
    parentId: string;
    studentName: string;
    repName: string;
    type: string;
    challenges: string;
    value: string;
    alternatives: string;
}
export declare const genPostC2DebriefInDatabase: ({ parentId, studentName, repName, type, challenges, value, alternatives, }: GenPostC2DebriefInDatabaseProps) => Promise<void>;
