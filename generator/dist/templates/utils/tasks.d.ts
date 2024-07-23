export interface RequiredTaskFields {
    studentName: string;
    studentPageId: string;
    repPageId: string;
    time: string;
}
interface AddTaskPropertiesProps extends RequiredTaskFields {
    taskName: string;
    taskId: string;
}
export declare const addTaskProperties: ({ studentName, studentPageId, repPageId, time, taskName, taskId, }: AddTaskPropertiesProps) => {
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
