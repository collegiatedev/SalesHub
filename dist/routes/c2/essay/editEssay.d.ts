import { RequestHandler } from "express";
import { RequiredAcceleratorTaskFields } from "../../../utils/acceleratorTask";
export declare const editEssay: RequestHandler;
export interface EditStudentEssayInDatabaseProps extends RequiredAcceleratorTaskFields {
    docLink: string;
    fileLink: string;
}
export declare const editStudentEssayInDatabase: ({ studentName, studentPageId, repPageId, time, docLink, fileLink, }: EditStudentEssayInDatabaseProps) => Promise<void>;
