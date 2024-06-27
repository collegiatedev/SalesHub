import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenConductC2MeetingPersonalBrandInDatabaseProps extends RequiredTaskFields {
    studentId: string;
    pbDocLink: string;
}
export declare const genConductC2MeetingPersonalBrandInDatabase: ({ studentName, studentPageId, repPageId, studentId, pbDocLink, }: GenConductC2MeetingPersonalBrandInDatabaseProps) => Promise<void>;
