export interface GenerateStudentBackgroundResponseInDatabaseProps {
    parentId: string;
    name: string;
    uGPA: string;
    wGPA: string;
    additionalAcademic: string;
    additionalActivity: string;
    professionalLinks: string;
    transcripts: string;
    resumePortfolios: string;
}
export declare const generateStudentBackgroundResponseInDatabase: ({ parentId, name, uGPA, wGPA, additionalAcademic, additionalActivity, professionalLinks, transcripts, resumePortfolios, }: GenerateStudentBackgroundResponseInDatabaseProps) => Promise<void>;
