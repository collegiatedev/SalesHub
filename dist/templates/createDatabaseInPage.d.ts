export interface CreateDatabaseInPageProps {
    pageId: string;
    name: string;
}
export declare const createDatabaseInPage: ({ name, pageId, }: CreateDatabaseInPageProps) => Promise<void>;
