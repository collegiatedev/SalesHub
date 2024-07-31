"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notProvided = void 0;
const notProvided = (info) => {
    return {
        paragraph: {
            rich_text: [
                {
                    type: "text",
                    text: {
                        content: `"${info}" info not provided`,
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
