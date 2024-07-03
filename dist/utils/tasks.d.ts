export interface RequiredAcceleratorTaskFields {
    emoji: string;
    studentName: string;
    studentPageId: string;
    repPageId: string;
    time: string;
}
interface AcceleratorTaskProps extends RequiredAcceleratorTaskFields {
    taskName: string;
    taskId: string;
}
export declare const acceleratorTaskProps: ({ emoji, studentName, studentPageId, repPageId, time, taskName, taskId, }: AcceleratorTaskProps) => {
    parent: {
        type: string;
        database_id: string;
    };
    icon: {
        type: string;
        emoji: string;
    };
    properties: {
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
        Time: {
            date: {
                start: string;
                end: null;
                time_zone: null;
            };
        };
    };
};
export {};
