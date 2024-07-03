"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskProperties = exports.notProvided = void 0;
const notProvided = (info) => {
    return {
        paragraph: {
            rich_text: [
                {
                    type: "text",
                    text: {
                        content: `${info} info not provided`,
                        link: null,
                    },
                    annotations: {
                        bold: false,
                        italic: false,
                        strikethrough: false,
                        underline: false,
                        code: false,
                        color: "default",
                    },
                },
            ],
            color: "default",
        },
    };
};
exports.notProvided = notProvided;
const addTaskProperties = ({ studentName, studentPageId, repPageId, taskName, taskId, }) => {
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
