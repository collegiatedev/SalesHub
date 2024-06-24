export interface GenerateEditStudentEssayInDatabaseProps {
    parentId: string;
    repId: string;
    studentName: string;
    leadId: string;
    docLink: string;
    fileLink: string;
}
export declare const generateEditStudentEssayInDatabase: ({ parentId, repId, studentName, leadId, docLink, fileLink, }: GenerateEditStudentEssayInDatabaseProps) => Promise<void>;
