import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenConductC2MeetingPersonalBrandInDatabaseProps extends RequiredTaskFields {
    studentId: string;
    pbDocLink: string;
    repName: string;
    leadRepId: string;
}
export declare const genConductC2MeetingPersonalBrandInDatabase: ({ studentName, studentPageId, repPageId, studentId, pbDocLink, repName, leadRepId, }: GenConductC2MeetingPersonalBrandInDatabaseProps) => Promise<void>;
