export interface GenerateContactInfoInDatabaseProps {
    parentId: string;
    studentEmail: string;
    studentPhone: string;
    parentEmail: string;
    parentPhone: string;
    studentName: string;
    parentName: string;
}
export declare const generateContactInfoInDatabase: ({ parentId, studentEmail, studentPhone, parentEmail, parentPhone, studentName, parentName, }: GenerateContactInfoInDatabaseProps) => Promise<void>;
