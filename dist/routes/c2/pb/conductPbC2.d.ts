import { RequestHandler } from "express";
import { RequiredAcceleratorTaskFields } from "../../../utils/acceleratorTask";
export declare const conductPbC2: RequestHandler;
export interface ConductC2MeetingPBInDatabaseProps extends RequiredAcceleratorTaskFields {
    studentId: string;
    pbDocLink: string;
    repName: string;
    leadRepId: string;
}
export declare const conductC2MeetingPBInDatabase: ({ studentName, studentPageId, repPageId, time, studentId, pbDocLink, repName, leadRepId, }: ConductC2MeetingPBInDatabaseProps) => Promise<void>;
