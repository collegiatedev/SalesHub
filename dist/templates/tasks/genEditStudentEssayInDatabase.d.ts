import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenEditStudentEssayInDatabaseProps extends RequiredTaskFields {
    docLink: string;
    fileLink: string;
}
export declare const genEditStudentEssayInDatabase: ({ studentName, studentPageId, repPageId, docLink, fileLink, }: GenEditStudentEssayInDatabaseProps) => Promise<void>;
