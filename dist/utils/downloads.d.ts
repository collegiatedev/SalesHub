type FileHandler<R = any> = (filePath: string) => Promise<R>;
export declare const useFile: <R>(url: string, name: string, fileHandler: FileHandler<R>) => Promise<R>;
export {};
