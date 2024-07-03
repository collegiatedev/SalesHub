import { RequiredAcceleratorTaskFields } from "../../../utils/acceleratorTask";
export interface AdditionalFeedbackToPBInDatabaseProps extends RequiredAcceleratorTaskFields {
    pbDocLink: string;
    dashboardPageId: string;
}
export declare const additionalFeedbackToPBInDatabase: ({ studentName, studentPageId, repPageId, time, pbDocLink, dashboardPageId, }: AdditionalFeedbackToPBInDatabaseProps) => Promise<void>;
