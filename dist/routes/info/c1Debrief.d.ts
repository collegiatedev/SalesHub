import { RequestHandler } from "express";
import { RequiredInfoFields } from "../../utils/studentInfo";
export declare const c1Debrief: RequestHandler;
export interface PostC1DebriefInDatabaseProps extends RequiredInfoFields {
    activities: string;
    pronunciation: string;
    pronouns: string;
    intended: string;
    plans: string;
    profile: string;
    additional: string;
}
export declare const postC1DebriefInDatabase: ({ studentName, infoId, time, activities, pronunciation, pronouns, intended, plans, profile, additional, }: PostC1DebriefInDatabaseProps) => Promise<void>;
