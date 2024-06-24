export interface GenerateEditStudentEssayInDatabaseProps {
    parentId: string;
    repId: string;
    studentName: string;
    studentPageId: string;
    docLink: string;
    fileLink: string;
}
export declare const generateEditStudentEssayInDatabase: ({ parentId, repId, studentName, studentPageId, docLink, fileLink, }: GenerateEditStudentEssayInDatabaseProps) => Promise<void>;
