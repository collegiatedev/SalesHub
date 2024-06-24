export interface GenConductC1MeetingInDatabaseProps {
    studentId: string;
    studentFullName: string;
    studentEmail: string;
    studentNumber: string;
    parentEmail: string;
    parentNumber: string;
    leadPageId: string;
    repPageId: string;
    repId: string;
    grade: string;
    time: string;
}
export declare const genConductC1MeetingInDatabase: ({ studentId, studentFullName, studentEmail, studentNumber, parentEmail, parentNumber, leadPageId, repPageId, repId, grade, time, }: GenConductC1MeetingInDatabaseProps) => Promise<void>;
