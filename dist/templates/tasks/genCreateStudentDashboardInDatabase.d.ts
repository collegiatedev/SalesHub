import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenCreateStudentDashboardInDatabaseProps extends RequiredTaskFields {
    parentId: string;
}
export declare const genCreateStudentDashboardInDatabase: ({ studentName, studentPageId, repPageId, }: GenCreateStudentDashboardInDatabaseProps) => Promise<void>;
