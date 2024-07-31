export declare const notProvided: (info: string) => {
    paragraph: {
        rich_text: {
            type: "text";
            text: {
                content: string;
                link: null;
            };
            annotations: {
                bold: boolean;
                italic: boolean;
                strikethrough: boolean;
                underline: boolean;
                code: boolean;
                color: "default";
            };
        }[];
        color: "default";
    };
};
