import { RequiredAcceleratorTaskFields } from "../../../utils/acceleratorTask";
export interface EditStudentEssayInDatabaseProps extends RequiredAcceleratorTaskFields {
    docLink: string;
    fileLink: string;
}
export declare const editStudentEssayInDatabase: ({ studentName, studentPageId, repPageId, time, docLink, fileLink, }: EditStudentEssayInDatabaseProps) => Promise<void>;
