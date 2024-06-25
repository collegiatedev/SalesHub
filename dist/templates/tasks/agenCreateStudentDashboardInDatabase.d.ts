import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenCreateStudentDashboardInDatabaseProps extends RequiredTaskFields {
    folderLink: string;
    studentEmail: string;
}
export declare const genCreateStudentDashboardInDatabase: ({ studentName, studentPageId, repPageId, folderLink, studentEmail, }: GenCreateStudentDashboardInDatabaseProps) => Promise<void>;
