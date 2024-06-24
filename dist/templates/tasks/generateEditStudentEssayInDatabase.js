"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEditStudentEssayInDatabase = void 0;
const clients_1 = require("../../utils/clients");
const generateEditStudentEssayInDatabase = async ({ parentId, repId, studentName, studentPageId, docLink, fileLink, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "🔥",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `${studentName} - Edit Student Essay`,
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
                        id: repId,
                    },
                ],
            },
            "🚅 Task": {
                relation: [
                    {
                        id: "0d286379401143628168cbf237940f66",
                    },
                ],
            },
        },
    });
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_3: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Essay Editing",
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
                    is_toggleable: false,
                    color: "default",
                },
            },
            {
                numbered_list_item: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Copy and paste the text content from the student’s essay file upload into their doc",
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
            },
            {
                heading_3: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Essay Feedback",
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
                    is_toggleable: false,
                    color: "default",
                },
            },
            {
                paragraph: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Use the ",
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
                        {
                            type: "mention",
                            mention: {
                                page: {
                                    id: "2ed05a54-2ad3-4c2f-a98e-df4e57273494",
                                },
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
            },
        ],
    });
    keyMap.set("0d286379401143628168cbf237940f66", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("0d286379401143628168cbf237940f66")[1].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student Doc:",
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
                        icon: {
                            type: "emoji",
                            emoji: "👉",
                        },
                        color: "gray_background",
                    },
                },
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student File: ",
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
                },
                {
                    bookmark: {
                        caption: [],
                        url: fileLink,
                    },
                },
            ],
        });
        keyMap.set("3d9b3e96-3c0e-48e3-b975-7cecedea8bef", res.results);
        console.log("Created: 3d9b3e96-3c0e-48e3-b975-7cecedea8bef");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("3d9b3e96-3c0e-48e3-b975-7cecedea8bef")[0].id,
            children: [
                {
                    bookmark: {
                        caption: [],
                        url: docLink,
                    },
                },
            ],
        });
        keyMap.set("7c90bafd-6262-4799-8f85-fa894e97cc38", res.results);
        console.log("Created: 7c90bafd-6262-4799-8f85-fa894e97cc38");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.generateEditStudentEssayInDatabase = generateEditStudentEssayInDatabase;
