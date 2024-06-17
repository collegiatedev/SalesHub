export declare const createOutput: ({ pageId, directory, content, subfolder, }: {
    pageId: string;
    directory: string;
    content: any;
    subfolder: boolean;
}) => Promise<void>;
export declare const deleteDirectoryIfExists: (directory: string) => Promise<void>;
