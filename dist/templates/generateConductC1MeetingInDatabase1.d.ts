interface GenerateConductC1MeetingInDatabaseProps {
    parentId: string;
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
}
export declare const generateConductC1MeetingInDatabase: ({ parentId, studentId, studentFullName, studentEmail, studentNumber, parentEmail, parentNumber, leadPageId, repPageId, repId, grade, }: GenerateConductC1MeetingInDatabaseProps) => Promise<void>;
export {};
