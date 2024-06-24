import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenConductC1MeetingInDatabaseProps extends RequiredTaskFields {
    studentId: string;
    studentEmail: string;
    studentNumber: string;
    parentEmail: string;
    parentNumber: string;
    repId: string;
    grade: string;
    time: string;
}
export declare const genConductC1MeetingInDatabase: ({ studentId, studentName, studentEmail, studentPageId, studentNumber, parentEmail, parentNumber, repPageId, repId, grade, time, }: GenConductC1MeetingInDatabaseProps) => Promise<void>;
