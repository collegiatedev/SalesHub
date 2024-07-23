"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceleratorTaskProps = void 0;
const constants_1 = require("src/constants");
const acceleratorTaskProps = ({ emoji, studentName, studentPageId, repPageId, time, taskName, taskId, }) => {
    return {
        parent: {
            type: "database_id",
            database_id: constants_1.ACCELERATOR_TASKS_DB,
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
exports.acceleratorTaskProps = acceleratorTaskProps;
