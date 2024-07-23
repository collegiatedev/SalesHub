import { FileExtension } from "./constants";
type FileHandler<R = any> = (filePath: string) => Promise<R>;
export declare const useFile: <R>(url: string, fileExtension: FileExtension, fileHandler: FileHandler<R>) => Promise<R>;
export {};
