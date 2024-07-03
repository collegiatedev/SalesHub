import { RequestHandler } from "express";
import { RequiredInfoFields } from "../../utils/studentInfo";
export declare const c2Debrief: RequestHandler;
export interface PostC2DebriefInDatabaseProps extends RequiredInfoFields {
    repName: string;
    type: string;
    challenges: string;
    value: string;
    alternatives: string;
}
export declare const postC2DebriefInDatabase: ({ studentName, infoId, time, repName, type, challenges, value, alternatives, }: PostC2DebriefInDatabaseProps) => Promise<void>;
