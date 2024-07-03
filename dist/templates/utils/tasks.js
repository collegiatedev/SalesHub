"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskProperties = void 0;
const addTaskProperties = ({ studentName, studentPageId, repPageId, time, taskName, taskId, }) => {
    return {
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
    };
};
exports.addTaskProperties = addTaskProperties;
