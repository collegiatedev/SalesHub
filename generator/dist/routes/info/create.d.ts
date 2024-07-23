import { RequestHandler } from "express";
export declare const create: RequestHandler;
export interface CreateInfoDatabaseInPageProps {
    name: string;
    pageId: string;
}
export declare const createInfoDatabaseInPage: ({ name, pageId, }: CreateInfoDatabaseInPageProps) => Promise<string>;
