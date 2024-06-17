interface GenerateParentInsightResponseInDatabaseProps {
    parentId: string;
    name: string;
    whyNow: string;
    programFit: string;
    programSupport: Array<string>;
}
export declare const generateParentInsightResponseInDatabase: ({ parentId, name, whyNow, programFit, programSupport, }: GenerateParentInsightResponseInDatabaseProps) => Promise<void>;
export {};
