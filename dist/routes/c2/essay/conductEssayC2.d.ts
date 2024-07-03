import { RequiredAcceleratorTaskFields } from "../../../utils/acceleratorTask";
export interface ConductC2MeetingEssayInDatabaseProps extends RequiredAcceleratorTaskFields {
    studentId: string;
    essayDocLink: string;
    repName: string;
    leadRepId: string;
}
export declare const conductC2MeetingEssayInDatabase: ({ studentName, studentPageId, repPageId, time, studentId, essayDocLink, repName, leadRepId, }: ConductC2MeetingEssayInDatabaseProps) => Promise<void>;
