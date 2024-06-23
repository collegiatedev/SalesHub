export declare const createFolder: ({ directory, pageId, subfolder, }: {
    directory: string;
    pageId: string;
    subfolder: boolean;
}) => string;
export declare const createOutput: ({ pageId, directory, content, subfolder, }: {
    pageId: string;
    directory: string;
    content: any;
    subfolder: boolean;
}) => Promise<void>;
export declare const deleteDirectoryIfExists: (directory: string) => Promise<void>;
