export interface GeneratePostC1DebriefInDatabaseProps {
    parentId: string;
    activities: string;
    pronunciation: string;
    pronouns: string;
    intended: string;
    plans: string;
    profile: string;
    additional: string;
}
export declare const generatePostC1DebriefInDatabase: ({ parentId, activities, pronunciation, pronouns, intended, plans, profile, additional, }: GeneratePostC1DebriefInDatabaseProps) => Promise<void>;
