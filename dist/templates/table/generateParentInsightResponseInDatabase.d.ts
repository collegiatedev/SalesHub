export interface GenerateParentInsightResponseInDatabaseProps {
    parentId: string;
    name: string;
    whyNow: string;
    programFit: string;
    programSupport: string;
}
export declare const generateParentInsightResponseInDatabase: ({ parentId, name, whyNow, programFit, programSupport, }: GenerateParentInsightResponseInDatabaseProps) => Promise<void>;
