type FileHandler<R = any> = (filePath: string) => Promise<R>;
export declare const useOnlineFile: <R>(url: string, name: string, fileHandler: FileHandler<R>) => Promise<R>;
export {};
