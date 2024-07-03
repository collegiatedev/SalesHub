import { RequestHandler } from "express";
import { RequiredInfoFields } from "../../utils/studentInfo";
export declare const studentBackground: RequestHandler;
export interface StudentBackgroundInDatabaseProps extends RequiredInfoFields {
    uGPA: string;
    wGPA: string;
    additionalAcademic: string;
    additionalActivity: string;
    professionalLinks: string;
    transcripts: string;
    resumePortfolios: string;
}
export declare const studentBackgroundInDatabase: ({ studentName, infoId, uGPA, wGPA, additionalAcademic, additionalActivity, professionalLinks, transcripts, resumePortfolios, }: StudentBackgroundInDatabaseProps) => Promise<void>;
