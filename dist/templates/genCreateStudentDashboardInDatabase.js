"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCreateStudentDashboardInDatabase = void 0;
const clients_1 = require("../utils/clients");
const genCreateStudentDashboardInDatabase = async ({ parentId, }) => {
    const keyMap = new Map();
    const page = await clients_1.notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: parentId,
        },
        icon: {
            type: "emoji",
            emoji: "🚁",
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: "Create Student Dashboard",
                        },
                    },
                ],
            },
        },
    });
    let res = await clients_1.notionClient.blocks.children.append({
        block_id: page.id,
        children: [
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Add to ",
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
                                database: {
                                    id: "271a7f07-e25d-4fbd-a215-d7449802ad0b",
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
                    is_toggleable: false,
                    color: "default",
                },
            },
            {
                callout: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Full Name: <name>\nFolder Link: <link>",
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
                        emoji: "💡",
                    },
                    color: "gray_background",
                },
            },
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Todos",
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
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Find all instances of <Student Full Name> and replace with student’s full name",
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
                    checked: false,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Replace <Folder Link> (in Resources section) with the folder link",
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
                    checked: false,
                    color: "default",
                },
            },
            {
                to_do: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Share the dashboard with the student email:",
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
                    checked: false,
                    color: "default",
                },
            },
            {
                heading_1: {
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "Directions",
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
                    is_toggleable: true,
                    color: "default",
                },
            },
        ],
    });
    keyMap.set("c735d37a78cd43a28423a7caf9b37ab9", res.results);
    let promises = [];
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")[6].id,
            children: [
                {
                    video: {
                        caption: [],
                        type: "external",
                        external: {
                            url: "https://www.loom.com/share/5cb2a6f8c2074e249727a966cf60c450?sid=fd882e11-c36a-4fc9-937d-d520fe80b850",
                        },
                    },
                },
            ],
        });
        keyMap.set("6d4f54a6-e22b-4876-893a-51cba6e6434e", res.results);
        console.log("Created: 6d4f54a6-e22b-4876-893a-51cba6e6434e");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")[4].id,
            children: [
                {
                    to_do: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Set display type to “Create Bookmark”",
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
                        checked: false,
                        color: "default",
                    },
                },
            ],
        });
        keyMap.set("789c9aa8-3491-4d68-a062-00f28db5fa0f", res.results);
        console.log("Created: 789c9aa8-3491-4d68-a062-00f28db5fa0f");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")[3].id,
            children: [
                {
                    bulleted_list_item: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Should be done 3 times in total",
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
            ],
        });
        keyMap.set("85fddfc7-1079-4f32-bb33-61803a5e7697", res.results);
        console.log("Created: 85fddfc7-1079-4f32-bb33-61803a5e7697");
    })());
    promises.push((async () => {
        const res = await clients_1.notionClient.blocks.children.append({
            block_id: keyMap.get("c735d37a78cd43a28423a7caf9b37ab9")[5].id,
            children: [
                {
                    callout: {
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: "Student Email: <email>",
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
                            emoji: "✉️",
                        },
                        color: "gray_background",
                    },
                },
            ],
        });
        keyMap.set("b2674ba5-02a1-4c98-9c77-4bf87cfb7e1d", res.results);
        console.log("Created: b2674ba5-02a1-4c98-9c77-4bf87cfb7e1d");
    })());
    await Promise.all(promises);
    console.log("Done with batch");
    promises = [];
};
exports.genCreateStudentDashboardInDatabase = genCreateStudentDashboardInDatabase;
