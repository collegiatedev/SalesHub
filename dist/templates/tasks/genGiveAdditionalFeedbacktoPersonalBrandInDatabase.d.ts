import { RequiredTaskFields } from "../utils/requiredTaskFields";
export interface GenGiveAdditionalFeedbacktoPersonalBrandInDatabaseProps extends RequiredTaskFields {
    pbDocLink: string;
    studentDashboardPageId: string;
}
export declare const genGiveAdditionalFeedbacktoPersonalBrandInDatabase: ({ studentName, studentPageId, repPageId, pbDocLink, studentDashboardPageId, }: GenGiveAdditionalFeedbacktoPersonalBrandInDatabaseProps) => Promise<void>;
