export declare const notProvided: (info: string) => {
    paragraph: {
        rich_text: {
            type: string;
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
                color: string;
            };
        }[];
        color: string;
    };
};
export interface RequiredTaskFields {
    studentName: string;
    studentPageId: string;
    repPageId: string;
}
interface addTaskPropertiesProps {
    studentName: string;
    studentPageId: string;
    repPageId: string;
    taskName: string;
    taskId: string;
}
export declare const addTaskProperties: ({ studentName, studentPageId, repPageId, taskName, taskId, }: addTaskPropertiesProps) => {
    Name: {
        title: {
            text: {
                content: string;
            };
        }[];
    };
    "\uD83D\uDE88 Lead": {
        relation: {
            id: string;
        }[];
    };
    Assigned: {
        relation: {
            id: string;
        }[];
    };
    "\uD83D\uDE85 Task": {
        relation: {
            id: string;
        }[];
    };
};
export {};
