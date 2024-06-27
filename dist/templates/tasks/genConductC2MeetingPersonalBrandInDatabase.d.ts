import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenConductC2MeetingPersonalBrandInDatabaseProps extends RequiredTaskFields {
    studentId: string;
    pbDocLink: string;
    repName: string;
}
export declare const genConductC2MeetingPersonalBrandInDatabase: ({ studentName, studentPageId, repPageId, studentId, pbDocLink, repName, }: GenConductC2MeetingPersonalBrandInDatabaseProps) => Promise<void>;
