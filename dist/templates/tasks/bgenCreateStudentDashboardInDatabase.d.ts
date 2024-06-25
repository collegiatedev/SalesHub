import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenCreateStudentDashboardInDatabaseProps extends RequiredTaskFields {
    folderLink: string;
}
export declare const genCreateStudentDashboardInDatabase: ({ studentName, studentPageId, repPageId, folderLink, }: GenCreateStudentDashboardInDatabaseProps) => Promise<void>;
