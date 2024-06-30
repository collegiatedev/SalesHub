export interface GeneratePostC1DebriefInDatabaseProps {
    parentId: string;
    name: string;
    activities: string;
    pronunciation: string;
    pronouns: string;
    intended: string;
    plans: string;
    profile: string;
    additional: string;
}
export declare const generatePostC1DebriefInDatabase: ({ parentId, name, activities, pronunciation, pronouns, intended, plans, profile, additional, }: GeneratePostC1DebriefInDatabaseProps) => Promise<void>;
