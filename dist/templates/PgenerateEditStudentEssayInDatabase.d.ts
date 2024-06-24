export interface GenerateEditStudentEssayInDatabaseProps {
    parentId: string;
    docLink: string;
    fileLink: string;
}
export declare const generateEditStudentEssayInDatabase: ({ parentId, docLink, fileLink, }: GenerateEditStudentEssayInDatabaseProps) => Promise<void>;
