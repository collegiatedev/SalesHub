"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcceleratorTaskProps = void 0;
const createAcceleratorTaskProps = ({ studentName, studentPageId, repPageId, time, 
// should be provided by server
taskName, taskId, emoji, }) => {
    const ACCELERATOR_TASKS_DB = "c152fc19a8b944a0bebab93ad9da6da2";
    return {
        parent: {
            type: "database_id",
            database_id: ACCELERATOR_TASKS_DB,
        },
        icon: {
            type: "emoji",
            emoji,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `${studentName} - ${taskName}`,
                        },
                    },
                ],
            },
            "🚈 Lead": {
                relation: [
                    {
                        id: studentPageId,
                    },
                ],
            },
            Assigned: {
                relation: [
                    {
                        id: repPageId,
                    },
                ],
            },
            "🚅 Task": {
                relation: [
                    {
                        id: taskId,
                    },
                ],
            },
            Time: {
                date: {
                    start: time,
                    end: null,
                    time_zone: null,
                },
            },
        },
    };
};
exports.createAcceleratorTaskProps = createAcceleratorTaskProps;
